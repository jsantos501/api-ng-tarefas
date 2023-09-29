import { ResolveFn } from '@angular/router';
import { Lista } from '../model/lista';
import { ListaService } from '../services/lista.service';
import { Inject, inject } from '@angular/core';
import { Observable } from 'rxjs';


export const tarefaResolver: ResolveFn<Lista> = (route, state) =>{

  if(route.params && route.params['id']){
   
    return inject(ListaService).loadById(route.params['id'])
  }

  return {id: '', nomeTarefa: '',   custo: '', dataLimite: '', ordemApresentacao: '', flag: false};
}
