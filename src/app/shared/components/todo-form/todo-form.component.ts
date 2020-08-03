import { TodoStep } from './../../../core/model/todo-step.interface';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Todo } from 'src/app/core/model/todo.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnChanges {

  @Input()
  todo: Todo;

  @Input()
  usersUsername:{[key:string]:Object}[];

  @Input()
  localfields:Object={text:'Name',value:'username'};

  @Input()
  localWaterMark:string;

  @Input()
  value:string[];

  @Input()
  showForUserInput:boolean;

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
      forUser:[[''],Validators.required],
      steps: this.fb.array([]),
      StartDate:'',
      EndDate:''
    });
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes && changes['todo'] && this.todo != null) {
      console.log("eccolih."+this.todo.forUser.map(user=>user.username));

      this.stepsArray = [...this.todo.steps];
      this.stepsControl.clear();
      this.stepsArray.forEach(step => {
        this.stepsControl.push(this.fb.group({
          id: step.id,
          done: step.done,
          title: [step.title, Validators.required],
          Duration:[step.Duration,[Validators.required,Validators.min(0)]],
          StartDate:[moment(step.StartDate).toDate()]
        }));
      });
      console.log("qui loggoo",this.todo);
      this.todoForm.patchValue({
        id: this.todo.id,
        title: this.todo.title,
        description: this.todo.description,
        StartDate:moment(this.todo.StartDate).toDate(),
        EndDate:moment(this.todo.EndDate).toDate()
      })
    }
  }

  addStepToForm() {
    console.log("len:",this.stepsArray.length);
   // this.stepsArray = Object.assign([], this.stepsArray);
    this.stepsArray.push({
      done: false,
      title: '',
      id: this.stepsArray.length,
      Duration:0,
      StartDate:moment().toDate()
    });
    this.stepsControl.push(this.fb.group({
      done: false,
      title: ['', Validators.required],
      id: this.stepsArray.length>0 ? this.stepsArray.length-1 : this.stepsArray.length,
      Duration:[0, [Validators.required,Validators.min(0)]],
      StartDate:moment().toDate()
    }));
  }
  remStepToForm(indice:number) {
  //  this.stepsArray = Object.assign([], this.stepsArray);
    this.stepsArray.splice(indice,1);
    this.stepsControl.removeAt(indice);

  }

  confirmChanges() {
    console.log(this.todoForm.value);
    let newUsersAdded=this.todoForm.get('forUser').value.map(user=>({username:user}));
    let todoWithForUser=this.showForUserInput?{...this.todoForm.value,forUser:[...newUsersAdded]} as Todo:{...this.todoForm.value,forUser:[...this.todo.forUser]} as Todo ;

    this.formSubmitEvent.emit(todoWithForUser);
  }

  cancel() {
    this.undoEvent.emit(this.todoForm.value);
  }

}
