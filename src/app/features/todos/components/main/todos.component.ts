import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { Todo } from 'src/app/core/model/todo.interface';
import { TodosFacadeService } from '../services/todos-facade.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  httperror:string=null;
  get todosList(): Observable<Todo[]> {
    return this.todosFacadeService.tods$;
  }

  constructor(private todosFacadeService: TodosFacadeService) { }

  ngOnInit(): void {
    this.todosFacadeService.getAllTodos();
    this.todosFacadeService.todoErr$.subscribe(err=>this.httperror=err);
  }

  showDetail(todo: Todo) {
    this.todosFacadeService.goToDetail(todo.id);
  }

}
