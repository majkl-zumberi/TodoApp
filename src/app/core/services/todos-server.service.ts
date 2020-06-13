import { Injectable } from '@angular/core';
import { HttpCommunicationsService } from '../http-communications/http-communications.service';
import { Todo } from '../model/todo.interface';
import { Observable } from 'rxjs';
import { CoreModule } from '../core.module';

@Injectable()
export class TodosServerService {

  constructor(private httpCommunications: HttpCommunicationsService) { }

  retrieveAllTodos(): Observable<Todo[]>{
    return this.httpCommunications.retrieveGetCall<Todo[]>("todos");
  }

  retrieveTodoById(id: number): Observable<Todo>{
    return this.httpCommunications.retrieveGetCall<Todo>("todos/"+id);
  }

  updateTodo(todo: Todo): Observable<Todo[]>{
    return this.httpCommunications.retrievePutCall("todos/"+todo.id, todo);
  }
}
