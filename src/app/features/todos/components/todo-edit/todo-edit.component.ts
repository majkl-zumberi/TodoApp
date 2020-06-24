
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/app/core/model/todo.interface';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TodosFacadeService } from '../services/todos-facade.service';
import { Store, select } from '@ngrx/store';
import { filter, switchMap } from 'rxjs/operators';
import { getTodoById } from 'src/app/redux';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.scss']
})
export class TodoEditComponent implements OnInit,OnDestroy {
  todo:Todo;
  private subscription: Subscription = new Subscription();

  constructor(private todosFacadeService: TodosFacadeService, private route: ActivatedRoute,private store:Store) {
  }

  ngOnInit(): void {
    this.subscription.add(this.route.params.pipe(
      filter(params => params != null && params['id'] != null),
      switchMap(params => this.store.pipe(select(getTodoById, { id: Number(params['id']) })))
    ).subscribe(todo => {
      this.todo = todo;
    }));
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
