import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { Todo } from 'src/app/core/model/todo.interface';
import { Store } from '@ngrx/store';
import { retreiveAllTodos, updateTodo, insertTodoEff, DeleteTodo } from 'src/app/redux/todos/todos.actions';
import { User } from 'src/app/core/model/user.interface';

@Injectable()
export class TodosFacadeService {

  private todoErrSubject:Subject<string>=new Subject();
  todoErr$=this.todoErrSubject.asObservable();
  constructor(private router: Router,private Store:Store) { }

  getAllTodos() {
    this.Store.dispatch(retreiveAllTodos());
  }

  editTodo(todo: Todo) {
    this.Store.dispatch(updateTodo({todo}));
  }

  removeTodo(id:number){
    this.Store.dispatch(DeleteTodo({id}));
  }

  addNewTodo(newTodo:Todo) {
    this.Store.dispatch(insertTodoEff({todo:newTodo}));
  }

  goToTodosHome() {
    this.router.navigateByUrl('/todos');
  }
  goToHome() {
    this.router.navigateByUrl('/home');
  }

  goToDetail(id: number) {
    this.router.navigateByUrl('/todos/detail/' + id);
  }

  goToEdit(id: number) {
    this.router.navigateByUrl('/todos/edit/' + id);
  }
  assignTodo(todo: Todo,remOrAdd:boolean){
    if(remOrAdd){
      let SessionUser=JSON.parse(sessionStorage.getItem('utente')) as User;

      let userAssigned={
        username:SessionUser.username
      };

      let assignedTodo={...todo,forUser:[...todo.forUser,userAssigned]};
      this.editTodo(assignedTodo);
    }else{
      let SessionUser=JSON.parse(sessionStorage.getItem('utente')) as User;

      let removeAssigned={...todo};
      removeAssigned.forUser=removeAssigned.forUser.filter(utente=>utente.username!==SessionUser?.username);
      console.log("rimosso l'utente ",removeAssigned);
      this.editTodo(removeAssigned);
    }
  }
}
