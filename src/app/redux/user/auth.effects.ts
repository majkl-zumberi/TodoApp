import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpCommunicationsService } from '../../core/http-communications/http-communications.service';
import { Observable } from 'rxjs';
import * as authActions from './auth.actions';
import { switchMap, map, tap} from 'rxjs/operators';
import { User } from 'src/app/core/model/user.interface';
import { goToHomepage } from 'src/app/features/todos/components/redux/todos.navigations.actions';
@Injectable()
export class authEffects{
  constructor(private action$:Actions, private http:HttpCommunicationsService){}

  updateUser$=createEffect(()=>this.action$.pipe(
    ofType(authActions.updateUser),
    switchMap((action)=>this.retreiveUserById(Number(action.user.id)).pipe(
      switchMap((utente)=> this.http.retrievePutCall<User>(`users/${action.user.id}`, {...utente,...action.user}).pipe(
        switchMap(user => [authActions.editUser({user}),goToHomepage()])
      ))
    )),
  ))

  retreiveUserById(id:number):Observable<User>{
    return this.http.retrieveGetCall<User>(`users/${id}`)
  }
}
