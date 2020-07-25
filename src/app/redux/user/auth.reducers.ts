import { Action, createReducer, on, State } from '@ngrx/store';
import { User } from '../../core/model/user.interface';
import { initUser, insertUser, removeUser, editUser,loginUserFailure, usersUsername } from './auth.actions';


export interface UserState {
  user: User;
  usersUsername:string[];
  // error message
  errorMessage: string | null;
}

export const initialState: UserState = {
    user:JSON.parse(sessionStorage.getItem("utente"))as User,
    errorMessage: null,
    usersUsername:['']
};


export const authReducer = createReducer(
    initialState,
    on(initUser, (state,{user}) => ({ ...state, user:user,errorMessage:null })),
    //on(insertTodo,(state,{todo}) => ({ ...state,todos:[...state.todos,todo] })),
    on(loginUserFailure,(state,{error})=>({...state,user:null,errorMessage:error})),
    on(removeUser,(state) => ({ ...state, user:null })),
    on(editUser,(state,{user}) => ({ ...state,user:user })),
    on(usersUsername,(state,{usernames})=>({...state,usersUsername:usernames}))
  );

  export function reducer(state: UserState | undefined, action: Action) {
    return authReducer(state, action);
  }
