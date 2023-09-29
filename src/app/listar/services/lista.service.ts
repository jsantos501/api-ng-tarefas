import { Injectable } from '@angular/core';
import { Lista } from '../model/lista';

import {HttpClient} from '@angular/common/http'
import { tap } from 'rxjs/internal/operators/tap';
import { first } from 'rxjs/internal/operators/first';
import { delay } from 'rxjs/internal/operators/delay';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ListaService {

  private readonly API = '/api/tarefas/';
  private readonly API_REORDENAR = this.API+'reordenar';
  
  
  constructor(private httpClient: HttpClient) { }

    list(){
      return this.httpClient.get<Lista[]>(this.API)
        .pipe(
          first(),
          delay(500),
          tap(lista => console.log(lista))
        );

    }

    loadById(id: string){
      return this.httpClient.get<Lista>(this.API+id);
        
    }


    save(record: Partial<Lista>){
     console.log(record);
      if(record.id){
        console.log('update');
        return this.update(record);
     }
     console.log('create');
     return this.create(record);

    }

 
    private create(record: Partial<Lista>){
      return this.httpClient.post<Lista>(this.API, record)
      .pipe(first());

    } 

    private update(record: Partial<Lista>){
      return this.httpClient.put<Lista>(this.API+record.id, record)
      .pipe(first());

    } 

    remove(id: any){
      return this.httpClient.delete<Lista>(this.API+id);
        
    }

    reordenar(lista: Partial<Lista[]>){
      return this.httpClient.put<Lista[]>(this.API_REORDENAR, lista);
    }

}
