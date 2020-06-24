import { createSelector } from '@ngrx/store';
import { TodoState } from './totos.reducers';


export interface AppState {
  todoState:TodoState;
}

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