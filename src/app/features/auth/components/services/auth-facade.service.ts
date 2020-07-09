import { Injectable } from '@angular/core';
import { User } from 'src/app/core/model/user.interface';
import { Router } from '@angular/router';
import { AuthServerService } from 'src/app/core/services/auth-server.service';
import { Store } from '@ngrx/store';
import { initUser, removeUser } from 'src/app/redux/user/auth.actions';
import { Subject } from 'rxjs';
import { find, filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  private errMessageSource=new Subject<string>();
  errMessage$=this.errMessageSource.asObservable();

  constructor(private router:Router,private authServer:AuthServerService,private Store:Store) { }

  signIn(username:string, password:string){
    this.authServer.retrieveAllUsers()
    .pipe(
     map(users=>
      users.find(actualUser=>actualUser.username === username && actualUser.password === password))
    )
    .subscribe(user=>{
      if(typeof user === 'undefined'){
        this.errMessageSource.next("utente non trovato")
      }else{
        this.Store.dispatch(initUser({user:{username:user.username,name:user.name}as User})),
        sessionStorage.setItem("utente", JSON.stringify({username:user.username,name:user.name})),
        this.router.navigateByUrl("/home");
      }
    })
  }

  signOut(){
    sessionStorage.removeItem('utente');
    this.Store.dispatch(removeUser({}));
    this.router.navigateByUrl("/auth/login");
  }

  signUp(username:string,password:string){
    this.authServer.registerUser({username,password,name:'',surname:''}as User)
    .pipe(
      map((user:User)=>{
        return {username:user.username,name:user.name}
      })
    )
    .subscribe((user:User)=>{
      this.Store.dispatch(initUser({user}));
      sessionStorage.setItem("utente",JSON.stringify(user));
      this.router.navigateByUrl("/home");
    });
    }
}
