import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Clientes } from '../model/clientes';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent {

  @Input() clientes: Clientes[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id','name','cnpj','cep','cidade','bairro','numero','actions'];

  constructor() {}

  onAdd() {
    this.add.emit(true);
  }

  onEdit(clientes: Clientes){
    this.edit.emit(clientes);
  }

  onDelete(clientes: Clientes){
    this.remove.emit(clientes);
  }

}
