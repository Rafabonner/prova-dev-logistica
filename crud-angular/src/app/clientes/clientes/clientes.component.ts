import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, first, Observable, of, Subscription } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

import { Clientes } from './../model/clientes';
import { ClientesService } from './../services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css'],
})
export class ClientesComponent implements OnDestroy {
  clientes$: Observable<Clientes[]> | null = null;
  isLoading = true;
  form: FormGroup;
  clientesFiltrados: Clientes[] = [];
  private subscriptions = new Subscription();
  private todosClientes: Clientes[] = [];

  constructor(
    private clientesService: ClientesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      name: [''],
      cnpj: [''],
      cep: [''],
      cidade: [''],
      bairro: [''],
      numero: [''],
    });

    this.valueChangeForm();
    this.refresh();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private valueChangeForm(): void {

    this.subscriptions.add(
      this.form.valueChanges.subscribe(() => {
        this.onFiltrar();
      })
    )
  }

  refresh() {
    // this.clientes$ = this.clientesService.list()
    // .pipe(
    //   catchError(error => {
    //     this.onError('Erro ao carregar os Clientes');
    //     return of([])
    //   })
    // );
    this.isLoading = true;

    this.subscriptions.add(
      this.clientesService
        .list()
        .pipe(
          first(),
          catchError((error) => {
            this.onError('Erro ao carregar os Clientes');
            return of([]);
          })
        )
        .subscribe({
          next: (clientes) => {
            this.todosClientes = clientes;
            this.onFiltrar();
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          }
        })
    );
  }

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(clientes: Clientes) {
    this.router.navigate(['edit', clientes.id], { relativeTo: this.route });
  }

  onRemove(clientes: Clientes) {
    this.clientesService.remove(clientes.id).subscribe(
      () => {
        this.refresh();
        this.snackBar.open('Curso Removido com Sucesso', 'X', {
          duration: 5000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      (error) => this.onError('Erro ao tentar remover curso.')
    );
  }

  onFiltrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, cnpj, cep, cidade, bairro, numero } = this.form.value;

      this.clientesFiltrados = this.todosClientes.filter(cliente => {
        if (!!name) {
          if (cliente.name.toLowerCase().search(name.toLowerCase()) < 0) {
            return false;
          }
        }

        if (!!cnpj) {
          if (cliente.cnpj.toLowerCase().search(cnpj.toLowerCase()) < 0) {
            return false;
          }
        }

        if (!!cep) {
          if (cliente.cep.toLowerCase().search(cep.toLowerCase()) < 0) {
            return false;
          }
        }

        if (!!cidade) {
          if (cliente.cidade.toLowerCase().search(cidade.toLowerCase()) < 0) {
            return false;
          }
        }

        if (!!bairro) {
          if (cliente.bairro.toLowerCase().search(bairro.toLowerCase()) < 0) {
            return false;
          }
        }

        if (!!numero) {
          if (cliente.numero.toLowerCase().search(numero.toLowerCase()) < 0) {
            return false;
          }
        }

        return true;
      })
  }
}
