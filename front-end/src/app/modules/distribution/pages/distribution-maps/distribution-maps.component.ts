import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { ClientService } from 'app/modules/client/services/client.service';

@Component({
  selector: 'app-distribution-maps',
  templateUrl: './distribution-maps.component.html',
  styleUrls: ['./distribution-maps.component.css']
})
export class DistributionMapsComponent implements AfterViewInit {

  @ViewChild(GoogleMap) googleMap!: GoogleMap;

  // Coordenadas y zoom del mapa
  center: google.maps.LatLngLiteral = { lat: -17.851511, lng: -63.099127 };
  zoom = 17;

  markers: google.maps.LatLngLiteral[] = [];  // Lista de marcadores

  constructor(private service: ClientService) {}

  ngAfterViewInit(): void {
    this.service.getAllClient().subscribe((resp: any) => {
      // Filtrar solo los clientes con coordenadas válidas
      this.markers = resp
        .filter(client => client.latitude !== null && client.longitude !== null)
        .map(client => ({ lat: client.latitude, lng: client.longitude }));

      // Asegurarnos de que el mapa esté inicializado antes de agregar los marcadores
      if (this.googleMap && this.googleMap.googleMap) {
        const googleMapInstance = this.googleMap.googleMap;

        // Agregar los marcadores al mapa
        this.markers.forEach(markerData => {
          const marker = new google.maps.Marker({
            position: markerData,
            map: googleMapInstance,  // Asignamos el mapa al marcador
          });

          // Agregar evento de clic
          marker.addListener('click', () => {
            this.onMarkerClick(markerData);
          });
        });
      } else {
        console.error('Google map is not initialized yet!');
      }
    });
  }

  // Método cuando un marcador es clickeado
  onMarkerClick(marker: google.maps.LatLngLiteral) {
    console.log('Clic en marcador:', marker);
    alert(`Clic en marcador en lat: ${marker.lat}, lng: ${marker.lng}`);
  }
}
