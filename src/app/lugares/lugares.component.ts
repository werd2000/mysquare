import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from '../../environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { LugaresService } from '../services/lugares.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html'
})
export class LugaresComponent implements OnInit, OnDestroy {

  title = 'mysquare';
  mapbox = (Mapboxgl as typeof Mapboxgl);
  map: Mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = -27.377200900501208;
  lng = -55.90348687170858;
  zoom = 12;
  lugares = null;
  suscriptor: Subscription[] = [];
  msgError: string;

  constructor(
    private lugaresService: LugaresService
  ) {
    this.mapbox.accessToken = environment.mapbox.accessToken;
    this.suscriptor.push(
      this.lugaresService.getLugares().subscribe( (lugares) => {
        // console.log(lugares);
        this.lugares = lugares;
        this.buildMap();
      },
      (err) => {
        console.error(err);
        this.msgError = err;
      })
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.suscriptor.forEach(susc => {
      susc.unsubscribe();
    });
  }

  buildMap() {
    this.map = new Mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new Mapboxgl.NavigationControl());
    this.lugares.forEach(lugar => {
      this.crearMarcador(lugar.lng, lugar.lat);
    });
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
