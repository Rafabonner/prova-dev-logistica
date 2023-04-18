import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes/clientes.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientesListComponent } from './clientes-list/clientes-list.component';




@NgModule({
  declarations: [
    ClientesComponent,
    ClientesFormComponent,
    ClientesListComponent,
  ],
  providers: [provideNgxMask({
    validation: false,
  })],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class ClientesModule { }
