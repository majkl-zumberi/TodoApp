import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { initTodos, retreiveAllTodos } from './redux/todos/todos.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TodoApp';
  constructor(private store: Store) {

  }

  ngOnInit(): void {
    this.store.dispatch(retreiveAllTodos());
  }
}
