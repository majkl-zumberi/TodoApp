import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpCommunicationsService } from '../../core/http-communications/http-communications.service';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { initTodos, retreiveAllTodos, updateTodo, editTodo, insertTodoEff, insertTodo, DeleteTodo, removeTodo } from './todos.actions';
import { switchMap, map, tap, concatMap, mergeMap } from 'rxjs/operators';
import { Todo } from '../../core/model/todo.interface';
import { goToDetail, goToHome } from '../../features/todos/components/redux/todos.navigations.actions';


@Injectable()
export class TodosEffects{

  constructor(private action$:Actions, private http:HttpCommunicationsService){}

  retreiveAllTodos$:Observable<Action>=createEffect(()=>this.action$.pipe(
    //filtro l'azione se è di tipo retreiveAllTodos allora va nello switchMap
    ofType(retreiveAllTodos),
    //dopo il dispatch
    switchMap((action)=> this.http.retrieveGetCall<Todo[]>("todos").pipe(
      map(todos => initTodos({todos}))
    ))

  ));
  updateTodo$:Observable<Action>=createEffect(()=>this.action$.pipe(
    //filtro l'azione se è di tipo updateTodo allora va nello switchMap
    ofType(updateTodo),
    //dopo il dispatch
    switchMap((action)=>  this.http.retrievePutCall<Todo>(`todos/${action.todo.id}`, action.todo).pipe(
      switchMap(todo=>[editTodo({ todo }),goToDetail({id:todo.id})])//restituisce 2 oggetti observable eseguendone una per uno
      // map(todo => editTodo({ todo }))
    ))

  ));
   insertTodoEff$:Observable<Action>=createEffect(()=>this.action$.pipe(
     //filtro l'azione se è di tipo retreiveAllTodos allora va nello switchMap
     ofType(insertTodoEff),
     //dopo il dispatch
     switchMap((action)=> this.http.retrievePostCall<Todo>(`todos/`, action.todo).pipe(
      switchMap(todo=>[insertTodo({ todo }),goToHome()])//restituisce 2 oggetti observable eseguendone una per uno
     ))

   ));

   DeleteTodo$:Observable<Action>=createEffect(()=>this.action$.pipe(
     //filtro l'azione se è di tipo DeleteTodo allora va nello switchMap
     ofType(DeleteTodo),
     //dopo il dispatch
     tap(action=>console.log(action)),
     switchMap(action=>this.http.retrieveDeleteCall<Todo>(`todos/${action.id}`)

     .pipe(map(()=>removeTodo({ id:action.id})))),
   ));

}
