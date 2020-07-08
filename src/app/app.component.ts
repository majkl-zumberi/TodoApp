import { Component } from '@angular/core';
import { TodosServerService } from './core/services/todos-server.service';
import { Store } from '@ngrx/store';
import { initTodos, retreiveAllTodos } from './redux/todos/todos.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TodoApp';
  constructor(private todosServerService: TodosServerService, private store: Store) {

  }

  ngOnInit(): void {
    // this.todosServerService.retrieveAllTodos().subscribe(todos => {
    //   this.store.dispatch(initTodos({ todos }));
    // });
    this.store.dispatch(retreiveAllTodos());
  }
}
