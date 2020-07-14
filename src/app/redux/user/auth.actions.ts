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

//update user profile
export const updateUser=createAction('[User] Effect: edit',  props<{user:User}>());
