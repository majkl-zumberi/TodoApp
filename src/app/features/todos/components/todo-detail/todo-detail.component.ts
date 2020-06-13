import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/model/todo.interface';
import { TodosFacadeService } from '../services/todos-facade.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss']
})
export class TodoDetailComponent implements OnInit {

  get todo(): Observable<Todo> {
    return this.todosFacadeService.todoSelected$;
  }

  constructor(private todosFacadeService: TodosFacadeService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params != null && params['id'] != null){
        this.todosFacadeService.getTodoById(params['id']);
      }
    });
  }

  edit(todo: Todo){
    this.todosFacadeService.goToEdit(todo.id);
  }

}
