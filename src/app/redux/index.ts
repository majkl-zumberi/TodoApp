import { createSelector, ActionReducerMap } from '@ngrx/store';
import { TodoState,todosReducer } from './todos.reducers';
import { UserState, authReducer } from './auth.reducers';


export interface AppState {
  todoState:TodoState;
  authState:UserState;
}
export const reducers: ActionReducerMap<AppState> = {
  todoState: todosReducer,
  authState: authReducer
};
export const selectTodoState = (state: AppState) => state.todoState;

export const selectTodos = createSelector(
 selectTodoState,
  (state: TodoState) => state.todos
);

export const getTodoById = createSelector(
    selectTodoState,
    (state: TodoState, props: { id: number }) => state.todos.find(item => item.id === props.id)
);

export const getFirstTodo = createSelector(
    selectTodoState,
    (state: TodoState) => state.todos.length > 0 ? state.todos[0] : null
);
