import { createAction, props} from '@ngrx/store';
import { User } from '../core/model/user.interface';
export const initUser  =createAction('[User] init',  props<{user:User}>());
export const insertUser =createAction('[User] insert',props<{user:User}>());
export const removeUser =createAction('[User] remove',props<{}>());
export const editUser   =createAction('[User] edit',  props<{user:User}>());
