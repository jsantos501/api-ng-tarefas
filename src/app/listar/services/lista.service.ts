import { Injectable } from '@angular/core';
import { Lista } from '../model/lista';

import {HttpClient} from '@angular/common/http'
import { tap } from 'rxjs/internal/operators/tap';
import { first } from 'rxjs/internal/operators/first';
import { delay } from 'rxjs/internal/operators/delay';

@Injectable({
  providedIn: 'root'
})

export class ListaService {

  private readonly API = '/api/tarefas/';
  
  
  constructor(private httpClient: HttpClient) { }

    list(){
      return this.httpClient.get<Lista[]>(this.API)
        .pipe(
          first(),
          delay(1000),
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

}
