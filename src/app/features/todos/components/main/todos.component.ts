import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/model/todo.interface';
import { TodosFacadeService } from '../services/todos-facade.service';
import { Store, select } from '@ngrx/store';
import { selectTodos } from 'src/app/redux';

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

  constructor(private todosFacadeService: TodosFacadeService, private Store:Store) { }
  newTodo = "";
  ngOnInit(): void {
    this.init();
  }

  init():void{
    this.todosFacadeService.getAllTodos();
    this.todosFacadeService.todoErr$.subscribe(err=>this.httperror=err);
  }
  showDetail(todo: Todo) {
    this.todosFacadeService.goToDetail(todo.id);
  }

  removeTodo(todo:Todo){
    console.log("emitted: ",todo.title);
    this.todosFacadeService.removeTodo(todo.id);
    this.init();
  }

  addNewTodo(newTodo:string){
    console.log(`user try to add new todo: ${newTodo}`);
    let todoToAdd= {title:newTodo,description:'',steps:[]} as Todo
    this.todosFacadeService.addNewTodo(todoToAdd);
    this.init();
  }

}
