import { TodoStep } from './../../../core/model/todo-step.interface';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Todo } from 'src/app/core/model/todo.interface';


@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnChanges {

  @Input()
  todo: Todo;

  @Output()
  formSubmitEvent: EventEmitter<Todo> = new EventEmitter<Todo>();

  @Output()
  undoEvent: EventEmitter<Todo> = new EventEmitter();

  todoForm: FormGroup;
  stepsArray: TodoStep[] = []

  get stepsControl(): FormArray {
    return this.todoForm.get('steps') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      id: null,
      title: ['', Validators.required],
      description: ['', Validators.required],
      steps: this.fb.array([]),
      forUser: this.fb.array([])
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes && changes['todo'] && this.todo != null) {
      this.stepsArray = [...this.todo.steps];
      this.stepsControl.clear();
      this.stepsArray.forEach(step => {
        this.stepsControl.push(this.fb.group({
          id: step.id,
          done: step.done,
          title: [step.title, Validators.required]
        }));
      });
      console.log("qui loggo",this.todo);
      this.todoForm.patchValue({
        id: this.todo.id,
        title: this.todo.title,
        description: this.todo.description,
        forUser:this.todo.forUser
      })
    }
  }

  addStepToForm() {
    console.log("len:",this.stepsArray.length);
   // this.stepsArray = Object.assign([], this.stepsArray);
    this.stepsArray.push({
      done: false,
      title: '',
      id: this.stepsArray.length
    });
    this.stepsControl.push(this.fb.group({
      done: false,
      title: ['', Validators.required],
      id: this.stepsArray.length>0 ? this.stepsArray.length-1 : this.stepsArray.length
    }));
  }
  remStepToForm(indice:number) {
  //  this.stepsArray = Object.assign([], this.stepsArray);
    this.stepsArray.splice(indice,1);
    this.stepsControl.removeAt(indice);

  }

  confirmChanges() {
    console.log(this.todoForm.value);

    let todoWithForUser={...this.todoForm.value,forUser:[...this.todo.forUser]} as Todo;

    this.formSubmitEvent.emit(todoWithForUser);
  }

  cancel() {
    this.undoEvent.emit(this.todoForm.value);
  }

}
