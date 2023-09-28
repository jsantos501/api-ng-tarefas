import { Component, OnInit } from '@angular/core';
import { Lista } from '../../model/lista';
import { ListaService } from '../../services/lista.service';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-lista',
  templateUrl: 'lista.component.html',
  styleUrls: ['lista.component.scss']
  
})
export class ListaComponent implements OnInit{

  lista$: Observable<Lista[]> | null = null;

  constructor(
    public dialog: MatDialog,
    private listaService: ListaService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar){
    
      this.refresh();

  }  

  refresh(){
    this.lista$ = this.listaService.list()
    .pipe(
      catchError(error => {
        this.onError('Error ao carregar as tarefas.');
        return of([]);
      })
    );
  }
 
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }


  ngOnInit(): void {

  }
  onAdd() {
    this.router.navigate( ['new'], {relativeTo: this.route})
  }
 
  onEdit(tarefa: Lista) {
    this.router.navigate( ['edit', tarefa.id], {relativeTo: this.route})
  }

  onRemove(tarefa: Lista) {

      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: 'Tem certeza que deseja remover essa tarefa?'
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log(result);

        if(result){
          this.listaService.remove(tarefa.id).subscribe(
            () =>{
              this.refresh();
              this.snackBar.open('tarefa removida com sucesso', 'X', 
                { duration: 5000,
                  verticalPosition: 'top',
                  horizontalPosition: 'center'});
            },
            error => this.onError('Erro ao tentar remover a tarefa.'));
        }
      });
    



  }
  
}
