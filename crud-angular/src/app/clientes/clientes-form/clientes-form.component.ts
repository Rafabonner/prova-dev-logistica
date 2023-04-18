import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ClientesService } from '../services/clientes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Clientes } from '../model/clientes';


@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {
  // TODO colocar subscriptions
  form : FormGroup;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: ClientesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
    ){

    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14)]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      cidade: ['', [Validators.required]],
      bairro: ['', [Validators.required]],
      numero: ['', [Validators.required]]
    });
  }
  ngOnInit(): void {
    const cliente: Clientes = this.route.snapshot.data['cliente'];
    this.form.setValue({
      id: cliente.id,
      name: cliente.name,
      cnpj: cliente.cnpj,
      cep: cliente.cep,
      cidade: cliente.cidade,
      bairro: cliente.bairro,
      numero: cliente.numero

    })
  }

  OnInit(): void{

  }

  onCancel(){
    this.location.back();

  }

  onSubmit(): void{
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.service.save(this.form.value)
      .subscribe({
        next: (result) => this.onSuccess(),
        error: (error) => this.onError()
      });
  }

  private onSuccess(){
    this.snackBar.open('Cliente salvo com sucesso','',{duration: 5000});
    this.onCancel();
  }

  private onError(){
    this.snackBar.open('Erro ao salvar o cliente','',{duration: 5000});
  }

  getErrorMessage(fieldName: string){
    const field = this.form.get(fieldName);

    if (field?.hasError('required')){
      return 'Campo Obrigatorio';
    }

    // if (field?.hasError('minlength')){
    //   const requiredLength = field.errors ? field.errors['minlength']['requiredLength']: 14;
    //   return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    // }

    // if (field?.hasError('maxlength')){
    //   const requiredLength = field.errors ? field.errors['maxlength']['requiredLength']: 14;
    //   return `Tamanho máximo precisa ser de ${requiredLength} caracteres.`;
    // }

    return 'Campo Inválido';
  }




}
