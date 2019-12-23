import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {

  id = null;
  lugar: any = {};

  constructor(
    private route: ActivatedRoute,
    private lugaresService: LugaresService
  ) {
    // console.log(this.route.snapshot.params.id);
    // console.log(this.route.snapshot.queryParams.action);
    // console.log(this.route.snapshot.queryParams.referer);
    this.id = this.route.snapshot.params.id;
    // console.log(this.buscarLugar());
    this.lugaresService.buscarLugar(this.id)
      .subscribe( (lugar) => {
        this.lugar = lugar;
      });
  }

  ngOnInit() {

  }
}
