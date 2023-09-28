import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './conteiners/lista/lista.component';
import { TarefaFormComponent } from './conteiners/tarefa-form/tarefa-form.component';
import { tarefaResolver } from './guards/tarefa.resolver';

const routes: Routes = [
  { path: '', component: ListaComponent },
  { path: 'new', component: TarefaFormComponent , resolve:{tarefa: tarefaResolver} },
  { path: 'edit/:id', component: TarefaFormComponent, resolve:{tarefa: tarefaResolver} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarRoutingModule {
  
 }
