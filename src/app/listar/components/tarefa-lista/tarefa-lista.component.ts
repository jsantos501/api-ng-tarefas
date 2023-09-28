import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lista } from '../../model/lista';

@Component({
  selector: 'app-tarefa-lista',
  templateUrl: './tarefa-lista.component.html',
  styleUrls: ['./tarefa-lista.component.scss']
})
export class TarefaListaComponent implements OnInit {

  @Input() lista: Lista[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['id', 'nomeTarefa', 'custo', 'dataLimite',  'actions'];


  constructor() {

  }
  ngOnInit(): void {

  }

  onAdd() {
    this.add.emit(true);
  }

  onEdit(lista: Lista) {
    this.edit.emit(lista);
  }

  onDelete(lista: Lista) {
    this.remove.emit(lista);
  }

}
