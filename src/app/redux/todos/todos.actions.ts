import { createAction, props} from '@ngrx/store';
import { Todo } from '../../core/model/todo.interface';
//store
export const initTodos          =createAction('[Todos] store init',  props<{todos:Todo[]}>());
export const insertTodo         =createAction('[Todos] store insert',props<{todo:Todo}>());
export const removeTodo         =createAction('[Todos] store remove',props<{id:number}>());
export const editTodo           =createAction('[Todos] store edit',  props<{todo:Todo}>());
//effects
export const retreiveAllTodos     =createAction('[Todos] effect - get all');
export const updateTodo           =createAction('[Todos] effect - update',props<{todo:Todo}>());
export const insertTodoEff        =createAction('[Todos] effect - insert',props<{todo:Todo}>());
export const DeleteTodo           =createAction('[Todos] effect - remove',props<{id:number}>());

//assign todo
export const assignUser=createAction('[User] assign-user',  props<{todo:Todo}>());
export const dismissUser=createAction('[User] dismiss-user',  props<{todo:Todo}>());
