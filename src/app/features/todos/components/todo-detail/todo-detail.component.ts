import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Todo } from 'src/app/core/model/todo.interface';
import { TodosFacadeService } from '../services/todos-facade.service';
import { filter, switchMap } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getTodoById, getCurrentNavigatedTodo } from 'src/app/redux';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent {
  get todo():Observable<Todo>{
    return this.store.pipe(select(getCurrentNavigatedTodo));
  };


  constructor(private todosFacadeService: TodosFacadeService, private route: ActivatedRoute,private store:Store) {
  }

  edit(todo: Todo){
    this.todosFacadeService.goToEdit(todo.id);
  }

}
