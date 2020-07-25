
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/app/core/model/todo.interface';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TodosFacadeService } from '../services/todos-facade.service';
import { Store, select } from '@ngrx/store';
import { filter, switchMap, map, tap } from 'rxjs/operators';
import { getTodoById, selectAllUsersUsername, selectCurrentUser, usersListOfTodo } from 'src/app/redux';
import { usersUsernameEffect } from 'src/app/redux/user/auth.actions';
import { User } from 'src/app/core/model/user.interface';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit,OnDestroy {
  todo:Todo;
  usersUsername:{ [key: string]: Object; }[];
  public localFields: Object = { text: 'Name', value: 'Code' };
  public localWaterMark: string = 'Seleziona gli utenti che seguiranno questo Todo';
  private subscription: Subscription = new Subscription();
  initialUsers: string[];

  constructor(private todosFacadeService: TodosFacadeService, private route: ActivatedRoute,private store:Store) {
  }
  get isCurrentUserAdmin(){
    return this.store.pipe(select(selectCurrentUser)).pipe(
      map(user=>user.admin)
    )
  }
  ngOnInit(): void {
    this.subscription.add(this.route.params.pipe(
      filter(params => params != null && params['id'] != null),
      switchMap(params => this.store.pipe(select(getTodoById, { id: Number(params['id']) })))
    ).subscribe(todo => {
      this.todo = todo;
    }));


      this.store.dispatch(usersUsernameEffect());
      this.store.pipe(select(selectAllUsersUsername)).subscribe(usernames=>{
        console.log("here are all the usernames");
        console.log(usernames);
        this.usersUsername=usernames;
        this.initialUsers=this.todo.forUser.map(user=>user.username);
      });

  }

  editForm(todo: Todo) {
    this.todosFacadeService.editTodo(todo);
  }

  undo(todo: Todo) {
    this.todosFacadeService.goToDetail(todo.id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
