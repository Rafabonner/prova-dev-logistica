import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from './clientes/clientes.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ClientesResolver } from './guards/clientes.resolver';

const routes: Routes = [
  {path: '', component: ClientesComponent},
  {path: 'new', component: ClientesFormComponent , resolve: {cliente: ClientesResolver}},
  {path: 'edit/:id', component: ClientesFormComponent, resolve: {cliente: ClientesResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
