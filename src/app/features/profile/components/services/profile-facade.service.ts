import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import { updateUser } from 'src/app/redux/user/auth.actions';
import { User } from 'src/app/core/model/user.interface';
@Injectable({
  providedIn: 'root'
})
export class ProfileFacadeService {

  constructor(private store:Store) { }

  editUser(form){
    console.log(form);
    this.store.dispatch(updateUser({user:form as User}));
    let oldUser=JSON.parse(sessionStorage.getItem('utente'));
    sessionStorage.removeItem('utente');
    sessionStorage.setItem('utente',JSON.stringify({...oldUser,...form}));
  }
}
