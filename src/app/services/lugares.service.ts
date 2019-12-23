import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LugaresService {
  lugares: any = [
    { id: 1, plan: 'gratuito', cercania: 1, distancia: '1km', active: true, nombre: 'Pequeño Hogar SRL', description: 'description 1'},
    { id: 2,
      plan: 'gratuito', cercania: 2, distancia: '5 km', active: true, nombre: 'Instituto Pequeño Hogar', description: 'description 2'},
    { id: 3, plan: 'pagado', cercania: 3, distancia: '10 km', active: false, nombre: 'Panadería Tahona', description: 'description 3'},
    { id: 4, plan: 'gratuito', cercania: 1, distancia: '1.8 km', active: true, nombre: 'Heladería Grido', description: 'description 4'},
    { id: 5, plan: 'gratuito', cercania: 2, distancia: '5.8 km', active: true, nombre: 'Panadería Panafrí', description: 'description 5'},
    { id: 6, plan: 'gratuito', cercania: 3, distancia: '10.8 km', active: true, nombre: 'Iglesia Catedral', description: 'description 6'},
  ];

  constructor(
    private af: AngularFirestore,
    private http: HttpClient
  ) {

  }

  public getLugares() {
    return this.af.collection('lugares').valueChanges();
    // return this.lugares;
  }

  buscarLugar(id: string) {
    // const uid = id.toString();
    return this.af.collection('lugares').doc(id).valueChanges();
  }

  guardarLugar(lugar) {
    const id = this.af.createId();
    lugar.id = id;
    this.af.collection('lugares').doc(id).set(lugar);
  }

  editarLugar(lugar) {
    this.af.collection('lugares').doc(lugar.id).set(lugar);
  }

  getGeoData(direccion) {
    // tslint:disable-next-line: max-line-length
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + direccion + '.json?access_token=pk.eyJ1Ijoid2VyZDIwMDAiLCJhIjoiY2szdnowd3BpMHQ1eDNlbzFkbzlxbjFraCJ9._Z1lvFBENlSl58pJMCAIPg';
    // Los%20Angeles.json?access_token=pk.eyJ1Ijoid2VyZDIwMDAiLCJhIjoiY2szdnowd3BpMHQ1eDNlbzFkbzlxbjFraCJ9._Z1lvFBENlSl58pJMCAIPg';
    return this.http.get(url);
  }
}
