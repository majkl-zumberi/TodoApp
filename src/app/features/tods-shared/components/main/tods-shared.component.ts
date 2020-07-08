import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/model/todo.interface';

import { selectTodosAssigned } from 'src/app/redux';
import { TodosFacadeService } from 'src/app/features/todos/components/services/todos-facade.service';
import { Store, select } from '@ngrx/store';
@Component({
  selector: 'app-tods-shared',
  templateUrl: './tods-shared.component.html',
  styleUrls: ['./tods-shared.component.scss']
})
export class TodsSharedComponent implements OnInit {
  httperror:string=null;
  get todosList(): Observable<Todo[]> {
    return this.Store.pipe(select(selectTodosAssigned));
  }

  constructor(private todosFacadeService: TodosFacadeService, private Store:Store) { }
  newTodo = "";
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
    let todoToAdd= {title:newTodo,description:'',steps:[]} as Todo
    this.todosFacadeService.addNewTodo(todoToAdd);
  }
  assignToUser(event,todo:Todo){
    console.log("metto true, rimuovo false: ",event);
    console.log("user try to add this todo into his todo page");
    console.log(todo);
    this.todosFacadeService.assignTodo(todo,event);
  }
}
