import { Injectable } from '@angular/core';
import { User } from 'src/app/core/model/user.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { initUser, removeUser, loginUser, signUpUser } from 'src/app/redux/user/auth.actions';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  private errMessageSource=new Subject<string>();
  errMessage$=this.errMessageSource.asObservable();

  constructor(private router:Router,private Store:Store) { }

  signIn(username:string, password:string){
    this.Store.dispatch(loginUser({username,password}));
  }

  signOut(){
    sessionStorage.removeItem('utente');
    this.Store.dispatch(removeUser({}));
    this.router.navigateByUrl("/auth/login");
  }

  signUp(username:string,password:string){
    this.Store.dispatch(signUpUser({username,password}));
  }
}
