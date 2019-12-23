import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DetalleComponent } from './detalle/detalle.component';
import { LugaresComponent } from './lugares/lugares.component';
import { ContactoComponent } from './contacto/contacto.component';
import { CrearComponent } from './crear/crear.component';

const routes: Routes = [
  { path: '', component: LugaresComponent},
  { path: 'lugares', component: LugaresComponent},
  { path: 'contacto', component: ContactoComponent},
  { path: 'crear', component: CrearComponent},
  { path: 'editar/:id', component: CrearComponent},
  { path: 'detalle/:id', component: DetalleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
