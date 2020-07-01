import { Injectable } from '@angular/core';
import { User } from 'src/app/core/model/user.interface';
import { Router } from '@angular/router';
import { AuthServerService } from 'src/app/core/services/auth-server.service';
import { Store } from '@ngrx/store';
import { initUser } from 'src/app/redux/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(private router:Router,private authServer:AuthServerService,private Store:Store) { }
  signIn(username:string, password:string){
    this.authServer.retrieveAllUsers().subscribe(users=>{
      users.forEach(user => {
        console.log(user);
        if (username == user.username && password == user.password){
          console.log("utente trovato, pronto per il login");
          let UserLogged= {
             username: username, name:user.name,
          } as User;
          this.Store.dispatch(initUser({user:UserLogged}));
          sessionStorage.setItem("utente", JSON.stringify(UserLogged));
          this.router.navigateByUrl("/home");
          return;
        }
      });
      console.log("utente non trovato");
      //this.errMessageSource.next("utente non trovato");
    })
  }
}
