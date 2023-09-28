import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListarRoutingModule } from './listar-routing.module';
import { ListaComponent } from './conteiners/lista/lista.component';
import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { TarefaFormComponent } from './conteiners/tarefa-form/tarefa-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TarefaListaComponent } from './components/tarefa-lista/tarefa-lista.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    ListaComponent,
    TarefaFormComponent,
    TarefaListaComponent,
    ConfirmationDialogComponent
    
  ],
  imports: [
    CommonModule,
    ListarRoutingModule,
    AppMaterialModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class ListarModule { }
