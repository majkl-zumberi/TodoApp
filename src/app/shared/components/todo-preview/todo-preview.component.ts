import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Todo } from 'src/app/core/model/todo.interface';
import { User } from 'src/app/core/model/user.interface';

@Component({
  selector: 'app-todo-preview',
  templateUrl: './todo-preview.component.html',
  styleUrls: ['./todo-preview.component.scss']
})
export class TodoPreviewComponent implements OnInit{

  @Input()
  todo: Todo;

  @Output()
  detailEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  deleteEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  toggleEvent: EventEmitter<Boolean> = new EventEmitter<Boolean>();

  toggle:boolean=false;

  constructor() { }

  ngOnInit(): void {
    this.toggle=this.todo?.forUser.some(t=>t.username==(JSON.parse(sessionStorage.getItem('utente')) as User)?.username)?true:false??false;
  }
  detailClick() {
    this.detailEvent.emit();
  }
  deleteTodo(todo:Todo){
    console.log(`user try to delete ${todo.title}`);
    this.deleteEvent.emit();
  }
  toggleBtn(){
    console.log("toggle");
    this.toggle=!this.toggle;
    console.log(this.toggle);
    this.toggleEvent.emit(this.toggle);
  }
}
