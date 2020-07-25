import { createAction, props} from '@ngrx/store';
import { User } from '../../core/model/user.interface';
export const initUser  =createAction('[User] init',  props<{user:User}>());
export const insertUser =createAction('[User] insert',props<{user:User}>());
export const removeUser =createAction('[User] remove',props<{}>());
export const editUser   =createAction('[User] edit',  props<{user:User}>());

//effects
//login
export const loginUser=createAction('[Auth] Login',  props<{username:string, password:string}>());
export const loginUserSuccess=createAction('[Auth] Login Success',props<{user:User}>());
export const loginUserFailure=createAction('[Auth] Login Failure',props<{error:string}>());

//signUp
export const signUpUser=createAction('[Auth] signUp',  props<{username:string, password:string}>());
export const signUpUserSuccess=createAction('[Auth] signUp Success', props<{user:User}>());
//update user profile
export const updateUser=createAction('[User] Effect: edit',  props<{user:User}>());

export const usersUsername=createAction('[User] save usernames into store',props<{usernames:string[]}>());
export const usersUsernameEffect=createAction('[User] get usernames from all users');
