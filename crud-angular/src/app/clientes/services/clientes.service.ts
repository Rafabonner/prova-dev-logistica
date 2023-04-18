import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Clientes } from './../model/clientes';
import { delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = 'api/clientes';

  constructor(private httpClient: HttpClient) { }

  list(){
    return this.httpClient.get<Clientes[]>(this.API)
    .pipe(
      delay(500)
    );
  }

  loadById(id: string){
    return this.httpClient.get<Clientes>(`${this.API}/${id}`);
  }

  save(record: Partial<Clientes>){
    if(record.id){
      return this.update(record);
    }
    return this.create(record);
  }

  private create(record: Partial<Clientes>) {
    return this.httpClient.post<Clientes>(this.API, record);
  }

  private update(record: Partial<Clientes>){
    return this.httpClient.put<Clientes>(`${this.API}/${record.id}`, record);
  }

   remove(id: string){
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  

}
