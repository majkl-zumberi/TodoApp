import { Injectable } from '@angular/core';
import { HttpCommunicationsService } from '../http-communications/http-communications.service';
import { Todo } from '../model/todo.interface';
import { Observable } from 'rxjs';
import { CoreModule } from '../core.module';

@Injectable()
export class TodosServerService {

  constructor(private httpCommunications: HttpCommunicationsService) { }

  // retrieveAllTodos(): Observable<Todo[]>{
  //   return this.httpCommunications.retrieveGetCall<Todo[]>("todos");
  // }

  // addNewTodo(todo: Todo): Observable<Todo>{
  //   return this.httpCommunications.retrievePostCall(`todos/`, todo);
  // }
  // updateTodo(todo: Todo): Observable<Todo>{
  //   return this.httpCommunications.retrievePutCall(`todos/${todo.id}`, todo);
  // }
  // deleteTodo(id:number): Observable<Todo>{
  //   return this.httpCommunications.retrieveDeleteCall(`todos/${id}`);
  // }

}
