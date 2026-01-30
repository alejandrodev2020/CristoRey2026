import { AfterViewInit, Component, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'app/modules/client/models/client';
import { DomSanitizer } from '@angular/platform-browser';
import { image } from 'app/modules/product/models/image-default.const';  // CAMBIAR PATH
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { imageUserDefault } from 'app/shared/models/image-user';
import { BehaviorSubject } from 'rxjs';
import { GoogleMap } from '@angular/google-maps';
import { GeolocationService } from 'app/modules/client/services/geolocation.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { PatientService } from 'app/modules/patient/services/patient.service';


@Component({
  selector: 'app-store-patient',
  templateUrl: './store-patient.component.html',
  styleUrls: ['./store-patient.component.scss']
})
export class StorePatientComponent implements OnInit ,AfterViewInit {

  panelOpenState = new BehaviorSubject<boolean>(false);
  @ViewChild(GoogleMap) googleMap: GoogleMap;
  movableMarker: google.maps.Marker;
  center: google.maps.LatLngLiteral = {lat: -17.783362, lng:-63.1847183};
  zoom = 17;
  isModal: any = false;
  form: FormGroup;
  panelExpanded = false;
  id: number | null = null;
  imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(imageUserDefault);
  currentLocation: { lat: number, lng: number } | null = null;
  isCreate = false;
  isSaving: boolean = false;
  listZone = [{ id: 1, name: 'Santa Cruz' }];
  userLogged = null;

  listDepartament = [  
      { id: 1, name: 'Santa Cruz' },
      { id: 2, name: 'Beni' },
      { id: 3, name: 'Pando' },
      { id: 4, name: 'La Paz' },
      { id: 5, name: 'Cochabamba' },
      { id: 6, name: 'Chuquisaca' },
      { id: 7, name: 'Potosí' },
      { id: 8, name: 'Oruro' },
      { id: 9, name: 'Tarija' }
  ];

  optionsCity = [
      { id: 1, name: 'Montero' },
      { id: 2, name: 'Santa Cruz de la Sierra' },
      { id: 3, name: 'Warnes' },
      { id: 4, name: 'Cotoca' },
      { id: 5, name: 'La Guardia' },
      { id: 6, name: 'Puerto Suárez' },
      { id: 7, name: 'San Ignacio de Velasco' },
      { id: 8, name: 'Concepción' },
      { id: 9, name: 'Roboré' },
      { id: 10, name: 'Saavedra' },
      { id: 11, name: 'Bajo Paraguá' },
      { id: 12, name: 'Ascensión de Guarayos' },
      { id: 13, name: 'San José de Chiquitos' },
      { id: 14, name: 'Carmen Rivero Tórrez' },
      { id: 15, name: 'El Torno' },
      { id: 16, name: 'Yapacaní' },
      { id: 17, name: 'Guarayos' },
      { id: 18, name: 'Minero' },
  ];

  optionsGender = [
      { id: 1, name: 'Hombre' },
      { id: 2, name: 'Mujer' }
  ];



  hasLink: boolean =false;
  currentClient ?: Client = null;




  @ViewChild('panel') panel: MatExpansionPanel;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private sanitizer: DomSanitizer,
    private service: PatientService,
    private geoService: GeolocationService,
    @Optional() @Inject(MAT_DIALOG_DATA) data,
    @Optional() private dialogRef: MatDialogRef<any>
  ) {
    this.isModal = (data); 
    let userString = localStorage.getItem('userLogged');
    this.userLogged = userString ? JSON.parse(userString) : null;
    debugger;
    this.form = this.fb.group({
      id: [null],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null],
      phone: [null, [Validators.required, Validators.minLength(7)]],
      ci: [null],
      nit: [null],
      photo: [null],
      ubication: [null],
      clientZoneId: [1, null],
      departamentId: [1],
      cityId : [1],
      genderId: [1],
      company: [null],
      latitude: [null],
      longitude: [null],
      reference:[null],
      link: [null]
    });
  }


  ngOnInit(): void {
    this.isCreate = this.router.url.endsWith('/store');
    if (!this.isCreate) {
      this.isCreate = false;
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
      this.service.getById(this.id).subscribe((response: Client) => {
        this.currentClient = response;
        this.prop.forEach((key) => {
          if (key === 'photo') {
            this.processPhoto(response[key]);
          } else {
            this.form.get(key)?.setValue(response[key]);
          }

          if(key==='link'){
            this.hasLink = (response[key] !== null);
          }

        });
        this.loadCoordsMap();
      });
    }
    else {
      this.isCreate = true;
    }
}


async loadCoordsMap() {
}

async getLatitude(): Promise<number> {
  if (this.isCreate || !this.currentClient.latitude) {
    try {
      const position = await this.geoService.getCurrentLocation();
      return position.coords.latitude;
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      return -17.7836996;
    }
  } else {
    return this.currentClient.latitude;
  }
}

async getLongitude(): Promise<number> {
  if (this.isCreate || !this.currentClient.longitude) {
    try {
      const position = await this.geoService.getCurrentLocation();
      return position.coords.longitude;
    } catch (error) {
      console.error('Error al obtener ubicación:', error);
      return -63.1826825; // Valor por defecto
    }
  } else {
    return this.currentClient.longitude; // Si ya existe longitud del cliente
  }
}

async ngAfterViewInit() {

  
}



getLocation() {
  window.open(this.currentClient.link, '_blank');
}


onMarkerDragEnd(event: google.maps.MapMouseEvent): void {
  const newPosition = event.latLng;
  if (newPosition) {
    const newLat = newPosition.lat();
    const newLng = newPosition.lng();

    if (isNaN(newLat) || isNaN(newLng)) {
      console.error('Coordenadas inválidas');
      return;
    }
    this.form.get('latitude')?.setValue(newLat);
    this.form.get('longitude')?.setValue(newLng);
    this.form.get('link')?.setValue(`https://www.google.com/maps?q=${newLat},${newLng}`);
  } else {
    console.error('La nueva posición no es válida');
  }
}


  prop = [
    "id",
    "firstName",
    "lastName",
    "phone",
    "ci",
    "nit",
    "photo",
    "ubication",
    "company",
    "latitude",
    "longitude",
    "reference",
    "link"
  ];

  get formLabel() {
    return this.isCreate ? 'Regístro' : 'Actualización';
  }

  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }

  private processPhoto(photo: any) {
    if (photo !== null && photo !== undefined) {
      const base64Image = "data:image/png;base64," + photo;
      this.form.get('photo')?.setValue(base64Image);
      this.imageSource = base64Image;
    } else {
      const defaultURL = "https://img.freepik.com/psd-gratis/3d-ilustracion-persona-gafas-sol_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1788068356.1716681600&semt=ais_user";
      this.form.get('photo')?.setValue(defaultURL);
      this.imageSource = defaultURL;
    }
  }

  setListZone() {
    this.service.getListZone().subscribe((resp: []) => {
      this.listZone = resp;
    })
  }

  getPanelState() {
    const isExpanded = this.panel.expanded;
    console.log('Panel está', isExpanded ? 'abierto' : 'cerrado');
  }

  async uploadAvatar(fileList: FileList) {
    if (!fileList.length) {
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png'];
    const file = fileList[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.setPhoto(reader.result);
    };
  }

  async setPhoto(data: any) {
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data);
    this.form.get('photo').setValue(data);
  }

  removeAvatar(): void {
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
    this.form.get('photo').setValue(null);
  }

  closeModal(data) {
    this.dialogRef.close(data);
  }

  cancel() {
    if (this.isModal) {
      this.dialogRef.close(false);
    }
    else {
      this.router.navigate(['patient/patient']);
    }
  }
  save(): void {
    let messaje = (this.isCreate) ? 'Registro' : 'Actualización';

    if (this.isValidForm()) {
      let data: Client = this.form.value;
      let myPhoto = data.photo;
      if(myPhoto != null){
        if (myPhoto.startsWith('https://')) {
          data.photo = null;
        }
      }
      data.id = this.id;
      this.isSaving = true;
      data.doctorId = (this.userLogged)? this.userLogged.id : null;
      this.service.store(data).subscribe((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Su ' + messaje + 'se realizo con exito!',
          showConfirmButton: false,
          timer: 1500
        })
        if (this.isModal) {
          this.closeModal(resp);
        }
        else {
          this.router.navigate(['patient/patient']);
        }
      });
    }
  }
  private isValidForm(): boolean {
    let values = this.form.controls;
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
    return this.form.valid;
  }

}
