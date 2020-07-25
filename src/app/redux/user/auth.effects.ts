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

  registerUser(username:string,password:string):Observable<User>{
   return this.http.retrievePostCall<User>("users",{username,password,name:'',surname:''})
  }
  getAllUsers():Observable<User[]>{
    return this.http.retrieveGetCall<User[]>('users');
  }
  formatUser(user:User):User{
      return {username:user.username,name:user.name,id:user.id,admin:false} as User;
  }

  loginUser$=createEffect(()=>this.action$.pipe(
    ofType(authActions.loginUser),
    switchMap(action=>this.retreiveAllUsers().pipe(
      switchMap(users=>of(this.checkUserAccount(action.username,action.password,users)).pipe(
        map( user=>{
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
    map( (action) => authActions.initUser({ user: action.user })),
    tap(()=>this.router.navigateByUrl('/home'))
  ));

  signUpUser$=createEffect(()=>this.action$.pipe(
    ofType(authActions.signUpUser),
    switchMap(action=>this.registerUser(action.username,action.password).pipe(
      switchMap(user=>of(this.formatUser(user)).pipe(
        map( (formattedUser) => authActions.signUpUserSuccess({ user: formattedUser }))
      ))
    ))
  ));

  signUpUserSuccess$=createEffect(()=>this.action$.pipe(
    ofType(authActions.signUpUserSuccess),
    tap((action)=>console.log('utente,registrato adesso devo registrarlo nella sessione e reindirizzarlo',action)),
    map( (action) => authActions.initUser({ user:action.user })),
    tap((action)=>{
      console.log('salvo in sessione l\'utente appena registrato');
      sessionStorage.setItem("utente",JSON.stringify(action.user));
      this.router.navigateByUrl('/home');
    })
  ))

  usersUsernameEffect$=createEffect(()=>this.action$.pipe(
    ofType(authActions.usersUsernameEffect),
    switchMap(()=>this.getAllUsers().pipe(
      switchMap((users:User[])=>of(users.map((user:User)=>user.username)).pipe(
        map((usersUsernames:string[])=>authActions.usersUsername({usernames:usersUsernames}))
      ))
    )),

  ))
}


