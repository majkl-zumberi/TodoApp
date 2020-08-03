import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/model/todo.interface';
import { TodosFacadeService } from '../services/todos-facade.service';
import { Store, select } from '@ngrx/store';
import { selectTodos, usersListOfTodo } from 'src/app/redux';
import * as moment from 'moment';
@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  httperror:string=null;
  get todosList(): Observable<Todo[]> {
    //return this.todosFacadeService.tods$;
    return this.Store.pipe(select(selectTodos));
  }
  get userList(): Observable<any> {
    //return this.todosFacadeService.tods$;
    return this.Store.pipe(select(usersListOfTodo));
  }

  constructor(private todosFacadeService: TodosFacadeService, private Store:Store) { }
  newTodo = "";
  newDate: Date=null;
  ngOnInit(): void {
    this.todosFacadeService.todoErr$.subscribe(err=>this.httperror=err);
  }

  showDetail(todo: Todo) {
    this.todosFacadeService.goToDetail(todo.id);
  }

  removeTodo(todo:Todo){
    console.log("emitted: ",todo.title);
    this.todosFacadeService.removeTodo(todo.id);
  }

  addNewTodo(newTodo:string){
    console.log(`user try to add new todo: ${newTodo}`);
    console.log(`data di oggi ${moment().toDate()}`);
    console.log(`data di domani ${moment().add(1, 'day').toDate()}`);
    let todoToAdd= {title:newTodo,description:'',steps:[],forUser:[],StartDate:moment().toDate(),EndDate:moment(this.newDate).toDate()} as Todo
    console.log("sto per aggiungere il nuovo todo");
    console.log(todoToAdd);
    this.todosFacadeService.addNewTodo(todoToAdd);
  }
  assignToUser(event,todo:Todo){
    console.log("emitted: ",event,todo);
    console.log("user try to add this todo into his todo page");
    console.log(todo);
    this.todosFacadeService.assignTodo(todo,event);
  }

  onCalendarChange($event: any) {
    console.log("evento ",$event.value);
    this.newDate=$event.value;
    console.log("model",this.newDate);
  }
}
