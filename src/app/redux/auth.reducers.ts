import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../core/model/user.interface';
import { initUser, insertUser, removeUser, editUser } from './auth.actions';


export interface UserState {
  user: User;
}

export const initialState: UserState = {
    user:null
};


export const authReducer = createReducer(
    initialState,
    on(initUser, (state,{user}) => ({ ...state, initUser:user })),
    //on(insertTodo,(state,{todo}) => ({ ...state,todos:[...state.todos,todo] })),
    on(removeUser,(state) => ({ ...state, user:null })),
    //on(editTodo,(state,{todo}) => ({ ...state,todos:state.todos.map(item=>item.id===todo.id?todo:item) }))
  );

  export function reducer(state: UserState | undefined, action: Action) {
    return authReducer(state, action);
  }
