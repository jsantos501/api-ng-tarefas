import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ListaService } from '../../services/lista.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../model/lista';

@Component({
  selector: 'app-tarefa-form',
  templateUrl: './tarefa-form.component.html',
  styleUrls: ['./tarefa-form.component.scss']
})
export class TarefaFormComponent implements OnInit {
  mascaraMoeda: string ="^[0-9]{1,10}.[0-9]{1,9}$";
  mascaraData: string ="^[0-3][0-9]/[01][0-9]/[0-9]{4}$";
  
  form = this.formBuilder.group({
    id: '',
    nomeTarefa: ['', [Validators.required, 
      Validators.minLength(3), 
      Validators.maxLength(100)]],

    custo: ['', [Validators.required, 
      Validators.maxLength(20), 
      Validators.pattern(this.mascaraMoeda)]],
      
    dataLimite: ['', [Validators.required, 
      Validators.maxLength(10),
      Validators.pattern(this.mascaraData)]],
  });



  constructor(private formBuilder: FormBuilder,
    private service: ListaService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute) {
  }


  ngOnInit(): void {

    const tarefa: Lista = this.route.snapshot.data['tarefa'];

    this.form.setValue({
      id: tarefa.id,
      nomeTarefa: tarefa.nomeTarefa,
      custo: tarefa.custo,
      dataLimite: tarefa.dataLimite
    });
  }

  onSubmit() {

    if (!this.form.valid) {
      this.snackBar.open('Por favor, preencher todos os campos corretamente.', 
      'X', { duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center' });
      return;
    }

    this.service.save(this.form.value)
      .subscribe({
        next: (v) => console.log('next action.'),
        error: (e) => this.onError(e),
        complete: () => this.onSuccess()
      });

  }

  private onError(error: string) {
    this.snackBar.open('Erro ao incluir tarefa.', 'X', { 
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center' });

  }

  private onSuccess() {
    this.snackBar.open('tarefa gravada com sucesso.', 'X', { 
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'center' });
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);

    if (field?.hasError('required')) {
      return 'Campo obrigatório';
    }

    if (field?.hasError('minlength')) {
      const requiredLength = field.errors ? field.errors['minlength']['requiredLength'] : 2;
      return 'tamanho mínimo precisa ser de '+requiredLength+' caracteres.';
    }

    if (field?.hasError('maxlength')) {
      const requiredLength = field.errors ? field.errors['maxlength']['requiredLength'] : 1;
      return 'tamanho máximo excedido de '+requiredLength+' caracteres.';
    }


    if (field?.hasError('pattern') && fieldName == 'custo') {
      return 'o custo deve ser numérico. ex: 234.56';
    }

    if (field?.hasError('pattern') && fieldName == 'dataLimite') {
      return 'a data deve ser no formato: dd/mm/aaaa';
    }
    return 'Campo Inválido';
  }
}
