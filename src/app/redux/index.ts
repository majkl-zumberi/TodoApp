import { createSelector, ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { TodoState,todosReducer } from './todos/todos.reducers';
import { UserState, authReducer } from './user/auth.reducers';
import { User } from '../core/model/user.interface';
import { RouterReducerState, routerReducer, getSelectors } from '@ngrx/router-store';
import { Params } from '@angular/router';


export interface AppState {
  todoState:TodoState;
  authState:UserState;
  router:RouterReducerState<any>
}
export const reducers: ActionReducerMap<AppState> = {
  todoState: todosReducer,
  authState: authReducer,
  router:routerReducer
};
export const selectTodoState = (state: AppState) => state.todoState;
export const selectUserState = (state: AppState) => state.authState;
export const selectRouter = createFeatureSelector<
  AppState,
  RouterReducerState<any>
>('router');

export const {
  selectCurrentRoute,   // select the current route
  selectQueryParams,    // select the current route query params
  selectQueryParam,     // factory function to select a query param
  selectRouteParams,    // select the current route params
  selectRouteParam,     // factory function to select a route param
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = getSelectors(selectRouter);
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

export const selectAllUsersUsername=createSelector(
  selectUserState,
  (UserState:UserState)=>UserState.usersUsername.map(username=>({Name:username,Code:username}))
);

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
export const getCurrentNavigatedTodo=createSelector(
    selectTodoState,
    selectRouteParams,
    (state:TodoState, params:Params)=>state.todos.find(item=> item.id=== Number(params['id']))
);
export const getFirstTodo = createSelector(
    selectTodoState,
    (state: TodoState) => state.todos.length > 0 ? state.todos[0] : null
);
