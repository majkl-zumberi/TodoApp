import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from 'src/app/core/model/todo.interface';

@Component({
  selector: 'app-todo-preview',
  templateUrl: './todo-preview.component.html',
  styleUrls: ['./todo-preview.component.scss']
})
export class TodoPreviewComponent {

  @Input()
  todo: Todo;

  @Output()
  detailEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  deleteEvent: EventEmitter<void> = new EventEmitter();

  constructor() { }

  detailClick() {
    this.detailEvent.emit();
  }
  deleteTodo(todo:Todo){
    console.log(`user try to delete ${todo.title}`);
    this.deleteEvent.emit();
  }

}
