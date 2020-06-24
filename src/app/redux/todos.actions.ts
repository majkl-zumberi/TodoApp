import { createAction, props} from '@ngrx/store';
import { Todo } from '../core/model/todo.interface';
export const initTodos  =createAction('[Todos] init',  props<{todos:Todo[]}>());
export const insertTodo =createAction('[Todos] insert',props<{todo:Todo}>());
export const removeTodo =createAction('[Todos] remove',props<{id:number}>());
export const editTodo   =createAction('[Todos] edit',  props<{todo:Todo}>());
