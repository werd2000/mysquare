import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MapboxService {

  mapbox = (Mapboxgl as typeof Mapboxgl);
  map: Mapboxgl.Map;

  title = 'mysquare';
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -27.377200900501208;
  lng = -55.90348687170858;
  zoom = 12;

  constructor(
    private http: HttpClient
  ) {
    this.mapbox.accessToken = environment.mapbox.accessToken;
  }

  buildMap() {
    this.map = new Mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new Mapboxgl.NavigationControl());
  }

  crearMarcador(lng: number, lat: number) {
    const marker = new Mapboxgl.Marker({
        draggable: true
      });
    marker.setLngLat([lng, lat]);
    marker.addTo(this.map);

    marker.on('drag', () => {
      console.log(marker.getLngLat());
    });
  }

  getGeoData(direccion) {
    // tslint:disable-next-line: max-line-length
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places-permanent/' + direccion + '.json?access_token=pk.eyJ1Ijoid2VyZDIwMDAiLCJhIjoiY2szdnowd3BpMHQ1eDNlbzFkbzlxbjFraCJ9._Z1lvFBENlSl58pJMCAIPg';
    // Los%20Angeles.json?access_token=pk.eyJ1Ijoid2VyZDIwMDAiLCJhIjoiY2szdnowd3BpMHQ1eDNlbzFkbzlxbjFraCJ9._Z1lvFBENlSl58pJMCAIPg';
    return this.http.get(url);
  }
}
