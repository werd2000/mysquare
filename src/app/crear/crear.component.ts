import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LugaresService } from '../services/lugares.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html'
})
export class CrearComponent implements OnInit {

  lugar: any = {};
  id: string;
  action: string;

  constructor(
    private lugaresService: LugaresService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    if (this.id !== undefined) {
      this.lugaresService.buscarLugar(this.id)
        .subscribe( (lugar) => {
          this.lugar = lugar;
        });
    }
  }

  guardarLugar() {
    const direccion = `${this.lugar.calle} ${this.lugar.ciudad} ${this.lugar.cp} ${this.lugar.pais}`;
    console.log(direccion);
    this.lugaresService.getGeoData(direccion)
      .subscribe( (resultado: any) => {
        // console.log(resultado.features[0]);
        this.lugar.lat = resultado.features[0].center[1];
        this.lugar.lng = resultado.features[0].center[0];
        if (this.id !== undefined) {
          this.lugaresService.editarLugar(this.lugar);
        } else {
          this.lugaresService.guardarLugar(this.lugar);
        }
        alert('Negocio guardado');
        this.lugar = {};
      });
  }
}
