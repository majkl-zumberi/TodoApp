import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/core/model/todo.interface';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {

  @Input()
  todo: Todo;

  @Output()
  editEvent: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  editClick() {
    this.editEvent.emit(this.todo);
  }

}
