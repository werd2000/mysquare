import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html'
})
export class LugaresComponent implements OnInit {

  title = 'mysquare';
  mapbox = (Mapboxgl as typeof Mapboxgl);
  map: Mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -27.377200900501208;
  lng = -55.90348687170858;
  zoom = 15;
  lugares = null;

  constructor(
    private lugaresService: LugaresService
  ) {
    this.lugaresService.getLugares().subscribe( (lugares) => {
      // console.log(lugares);
      this.lugares = lugares;
    });
    this.mapbox.accessToken = environment.mapbox.accessToken;
  }

  ngOnInit() {
    this.buildMap();
  }

  buildMap() {
    this.map = new Mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new Mapboxgl.NavigationControl());
    this.crearMarcador(this.lng, this.lat);
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
}
