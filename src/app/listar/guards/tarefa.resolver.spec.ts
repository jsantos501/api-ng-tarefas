import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tarefaResolver } from './tarefa.resolver';

describe('tarefaResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => tarefaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
