import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from '../core/model/todo.interface';
import { initTodos, insertTodo, removeTodo, editTodo } from './todos.actions';


export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
    todos:[]
};


const todosReducer = createReducer(
    initialState,
    on(initTodos, (state,{todos}) => ({ ...state, todos:todos })),
    on(insertTodo,(state,{todo}) => ({ ...state,todos:[...state.todos,todo] })),
    on(removeTodo,(state,{id}) => ({ ...state, todos:state.todos.filter(item=>item.id !==id) })),
    on(editTodo,(state,{todo}) => ({ ...state,todos:state.todos.map(item=>item.id===todo.id?todo:item) }))
  );

  export function reducer(state: TodoState | undefined, action: Action) {
    return todosReducer(state, action);
  }
