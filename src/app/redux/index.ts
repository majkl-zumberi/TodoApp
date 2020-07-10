import { createSelector, ActionReducerMap } from '@ngrx/store';
import { TodoState,todosReducer } from './todos/todos.reducers';
import { UserState, authReducer } from './user/auth.reducers';
import { User } from '../core/model/user.interface';


export interface AppState {
  todoState:TodoState;
  authState:UserState;
}
export const reducers: ActionReducerMap<AppState> = {
  todoState: todosReducer,
  authState: authReducer
};
export const selectTodoState = (state: AppState) => state.todoState;
export const selectUserState = (state: AppState) => state.authState;

export const selectTodos = createSelector(
 selectTodoState,
  (state: TodoState) => state.todos
);

export const selectCurrentUser=createSelector(
  selectUserState,
  (UserState:UserState)=>UserState.user
);

export const usersListOfTodo=createSelector(
  selectTodoState,
  (Todsstate: TodoState)=>{
   return Todsstate.todos.map(todo=>{
      return {
          idTodo:todo.id,
          users:todo.forUser.reduce((acc,curr,idx)=>idx==0?curr.username:`${acc},${curr.username}`,'' )
        }
      })
  })


export const selectTodosAssigned = createSelector(
  selectTodoState,
  selectUserState,
   (Todsstate: TodoState,UserState:UserState) => Todsstate.todos.filter(todo=>{

     return todo.forUser.some(t=>t.username==UserState.user.username);

     })
 );
export const getTodoById = createSelector(
    selectTodoState,
    (state: TodoState, props: { id: number }) => state.todos.find(item => item.id === props.id)
);

export const getFirstTodo = createSelector(
    selectTodoState,
    (state: TodoState) => state.todos.length > 0 ? state.todos[0] : null
);
