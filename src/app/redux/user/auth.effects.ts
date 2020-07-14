import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpCommunicationsService } from '../../core/http-communications/http-communications.service';
import { Observable, of } from 'rxjs';
import * as authActions from './auth.actions';
import { switchMap, map, tap} from 'rxjs/operators';
import { User } from 'src/app/core/model/user.interface';
import { Router } from '@angular/router';
@Injectable()
export class authEffects{
  constructor(private action$:Actions, private http:HttpCommunicationsService,private router:Router){}

  updateUser$=createEffect(()=>this.action$.pipe(
    ofType(authActions.updateUser),
    switchMap((action)=>this.retreiveUserById(Number(action.user.id)).pipe(
      switchMap((utente)=> this.http.retrievePutCall<User>(`users/${action.user.id}`, {...utente,...action.user}).pipe(
        switchMap(user => [authActions.editUser({user})]),
        tap(()=>this.router.navigateByUrl('/home'))
      ))
    )),
  ));


  retreiveUserById(id:number):Observable<User>{
    return this.http.retrieveGetCall<User>(`users/${id}`)
  }
  retreiveAllUsers():Observable<User[]>{
    return this.http.retrieveGetCall<User[]>("users")
  }
  checkUserAccount(username:string,password:string,users){
   return users.find(actualUser=>actualUser.username === username && actualUser.password === password);
  }

  loginUser$=createEffect(()=>this.action$.pipe(
    ofType(authActions.loginUser),
    switchMap(action=>this.retreiveAllUsers().pipe(
      switchMap(users=>of(this.checkUserAccount(action.username,action.password,users)).pipe(
        switchMap(async user=>{
          if(typeof user === 'undefined'){
            return authActions.loginUserFailure({error:'username e/o password non corretta'})
          }else{
            return authActions.loginUserSuccess({user});
          }
        })
      ))
    ))
  ));

  loginUserSuccess$=createEffect(()=>this.action$.pipe(
    ofType(authActions.loginUserSuccess),
    tap(action=>{
      console.log('salvo utente in sessione da auth.effects');
      sessionStorage.setItem("utente", JSON.stringify({username:action.user.username,name:action.user.name,surname:action.user.surname,id:action.user.id}))
    }),
    switchMap(async (action) => authActions.initUser({ user: action.user })),
    tap(()=>this.router.navigateByUrl('/home'))
  ));
}


