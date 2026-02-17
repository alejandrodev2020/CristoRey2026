import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  Optional,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoogleMap } from '@angular/google-maps';

import { DoctorService } from 'app/modules/doctor/services/doctor.service';
import { GeolocationService } from 'app/modules/client/services/geolocation.service';
import { image } from 'app/modules/product/models/image-default.const';
import { imageUserDefault } from 'app/shared/models/image-user';

@Component({
  selector: 'app-store-doctors',
  templateUrl: './store-doctors.component.html',
  styleUrls: ['./store-doctors.component.scss']
})
export class StoreDoctorsComponent implements OnInit, AfterViewInit {

  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  // ================= FORM =================
  form: FormGroup;
  id: number | null = null;
  isCreate = false;
  isSaving = false;
  isModal: any = false;

  // ================= IMAGE =================
  imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(imageUserDefault);

  // ================= MAP =================
  center: google.maps.LatLngLiteral = { lat: -17.783362, lng: -63.1847183 };
  zoom = 17;

markerPosition: google.maps.LatLngLiteral = {
  lat: -17.783362,
  lng: -63.1847183
};

markerOptions: google.maps.MarkerOptions = {
  draggable: true
};

onMarkerDragEnd(event: google.maps.MapMouseEvent) {
  if (!event.latLng) return;

  const lat = event.latLng.lat();
  const lng = event.latLng.lng();

  this.markerPosition = { lat, lng };

  // 🔧 backend espera string
  this.form.get('latitude')?.setValue(lat.toString());
  this.form.get('longitude')?.setValue(lng.toString());
}
  currentClient ?: any = null;
  // ================= PROPS =================
  prop = [
    'id',
    'firstName',
    'lastName',
    'phone',
    'ci',
    'nit',
    'photo',
    'businessName',
    'ubication',
    'latitude',
    'longitude',
    'isEmergency'
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private router: Router,
    private service: DoctorService,
    private geoService: GeolocationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    @Optional() private dialogRef: MatDialogRef<any>
  ) {
    this.isModal = data;

    this.form = this.fb.group({
      id: [null],
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null],
      phone: [null],
      ci: [null],
      nit: [null],
      photo: [null],
      businessName: [null],
      ubication: [null],
      latitude: [null],
      longitude: [null],
      isEmergency: [false]
    });
  }

  // ================= INIT =================
  ngOnInit(): void {
    this.isCreate = this.router.url.endsWith('/store');

    if (!this.isCreate && !this.isModal) {
      this.id = Number(this.activatedRoute.snapshot.params['id']);
      this.loadDoctor(this.id);
    } else if (this.isModal && this.data?.id) {
      this.id = this.data.id;
      this.loadDoctor(this.id);
    } else {
      this.isCreate = true;
    }
  }

  async ngAfterViewInit(): Promise<void> {
    if (this.isCreate) {
      await this.loadMyLocation();
    }
  }

  // ================= LOCATION =================
  private async loadMyLocation() {
    try {
      const position = await this.geoService.getCurrentLocation();
      this.initMap(position.coords.latitude, position.coords.longitude);
    } catch (error) {
      console.error('Error obteniendo ubicación', error);
      this.initMap(-17.783362, -63.1847183); // fallback
    }
  }

  private initMap(lat: number, lng: number) {
    this.center = { lat, lng };
    this.markerPosition = { lat, lng };
    this.applyCoordinates(lat, lng);
  }

private applyCoordinates(lat: number, lng: number) {
  this.form.get('latitude')?.setValue(lat.toString());
  this.form.get('longitude')?.setValue(lng.toString());
}

  // ================= LOAD EDIT =================
  private loadDoctor(id: number) {
    this.service.getById(id).subscribe((response: any) => {
      this.prop.forEach(key => {
        if (key === 'photo') {
          this.processPhoto(response[key]);
        } else {
          this.form.get(key)?.setValue(response[key]);
        }
      });

      if (response.latitude && response.longitude) {
        this.initMap(response.latitude, response.longitude);
      }
    });
  }

  // ================= IMAGE =================
  async uploadAvatar(fileList: FileList) {
    if (!fileList.length) return;

    const reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onload = () => this.setPhoto(reader.result);
  }

  async setPhoto(data: any) {
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(data);
    this.form.get('photo')?.setValue(data);
  }

  private processPhoto(photo: any) {
    if (photo) {
      const base64 = 'data:image/png;base64,' + photo;
      this.setPhoto(base64);
    }
  }

  removeAvatar(): void {
    this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(image);
    this.form.get('photo')?.setValue(null);
  }

  // ================= ACTIONS =================
  cancelStore() {
    if (this.isModal) {
      this.dialogRef?.close(null);
    } else {
      this.router.navigate(['doctors/doctors']);
    }
  }

  save(): void {
    if (!this.isValidForm()) return;

    const data = this.form.value;
    data.id = this.id;
    this.isSaving = true;

    this.service.store(data).subscribe(resp => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Su ${this.isCreate ? 'Registro' : 'Actualización'} se realizó con éxito`,
        showConfirmButton: false,
        timer: 1500
      });

      this.isModal
        ? this.dialogRef?.close(resp)
        : this.router.navigate(['doctors/doctors']);
    });
  }

  private isValidForm(): boolean {
    Object.keys(this.form.controls).forEach(key =>
      this.form.get(key)?.markAsTouched()
    );
    return this.form.valid;
  }

  control(key: string): FormControl {
    return this.form.controls[key] as FormControl;
  }
}
