import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { TodosModule } from '../../todos.module';
import { TodosServerService } from 'src/app/core/services/todos-server.service';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Todo } from 'src/app/core/model/todo.interface';
import { Store } from '@ngrx/store';
import { initTodos, editTodo, insertTodo } from 'src/app/redux/todos.actions';

@Injectable()
export class TodosFacadeService {

  //private todsSubject: BehaviorSubject<Todo[]> = new BehaviorSubject(null);
  //tods$ = this.todsSubject.asObservable();

  //private todSelectedSubject: BehaviorSubject<Todo> = new BehaviorSubject(null);
  //todoSelected$ = this.todSelectedSubject.asObservable();

  private todoErrSubject:Subject<string>=new Subject();
  todoErr$=this.todoErrSubject.asObservable();
  constructor(private todosServerService: TodosServerService, private router: Router,private Store:Store) { }

  getAllTodos() {
    this.todosServerService.retrieveAllTodos().subscribe(todos => {
      //this.todsSubject.next(todos);
      this.Store.dispatch(initTodos({todos}))//todos:todos
    },err=>{
      console.log("ERROREEEE",err);
      this.todoErrSubject.next("si è verificato un errore durante il caricamento. riprovare più tardi");
    });
  }

  editTodo(todo: Todo) {
    this.todosServerService.updateTodo(todo).subscribe((item: Todo) => {
      this.Store.dispatch(editTodo({todo: item}));
      this.goToDetail(todo.id);
    });
  }

  goToTodosHome() {
    this.router.navigateByUrl('/todos');
  }

  /*getTodoById(id: number) {
    this.todosServerService.retrieveTodoById(id).subscribe(todo => {
      this.todSelectedSubject.next(todo);
    });
  }*/

  goToDetail(id: number) {
    this.router.navigateByUrl('/todos/detail/' + id);
  }

  goToEdit(id: number) {
    this.router.navigateByUrl('/todos/edit/' + id);
  }

  removeTodo(id:number){
    this.todosServerService.deleteTodo(id).subscribe(()=>{
      this.getAllTodos();
      this.router.navigateByUrl('/todos');
    });
  }


  addNewTodo(newTodo:Todo) {
    this.todosServerService.addNewTodo(newTodo).subscribe((item: Todo) => {
      this.Store.dispatch(insertTodo({todo: item}));
      this.goToTodosHome();
    });
  }
}
