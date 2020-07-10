import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Todo } from 'src/app/core/model/todo.interface';
import { User } from 'src/app/core/model/user.interface';
import { Store, select } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/redux';
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-todo-preview',
  templateUrl: './todo-preview.component.html',
  styleUrls: ['./todo-preview.component.scss']
})
export class TodoPreviewComponent implements OnInit, OnDestroy{

  @Input()
  todo: Todo;
  @Input()
  userList: any;

  @Output()
  detailEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  deleteEvent: EventEmitter<void> = new EventEmitter();
  @Output()
  toggleEvent: EventEmitter<Boolean> = new EventEmitter<Boolean>();
  whoSubscribed:string;
  toggle:boolean=false;
  private sub:Subscription;
  constructor(private store:Store) { }
  ngOnInit(): void {
    console.log(this.userList);
    this.sub=this.store.pipe(select(selectCurrentUser))
    .pipe(
      map((user:User)=>(user?.username)??'')
    ).subscribe(username=>{
      this.toggle=this.todo?.forUser.some(t=>t?.username==username)?true:false??false;
    })
    this.userList=this.userList??[];
    let usersSubs=((this.userList.find(lista=>lista?.idTodo==this.todo.id)||'').users)??'';
    this.whoSubscribed=usersSubs?`a questo todo si sono iscritti ${usersSubs}`:'';
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
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
