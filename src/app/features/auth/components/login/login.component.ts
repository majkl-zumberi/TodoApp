import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthFacadeService } from '../services/auth-facade.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectUserState } from 'src/app/redux';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginError:string | null;
  loginForm: FormGroup;
  private sub:Subscription;
  getState: Observable<any>;

  get usernameControl():FormControl{
    return this.loginForm.get('username') as FormControl;
    }
    get passwordControl():FormControl{
    return this.loginForm.get('password') as FormControl;
    }


  constructor(private fb:FormBuilder,private authFacadeService:AuthFacadeService,private store:Store) {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
      });
      this.getState = this.store.select(selectUserState);
   }

  ngOnInit(): void {
    this.sub=this.getState.subscribe((state) => {
      this.loginError = state.errorMessage;
    });
  }

  loginUser(){
    console.log("username:"+this.usernameControl.value);
    console.log("password:"+this.passwordControl.value);

    this.authFacadeService.signIn(this.usernameControl.value,this.passwordControl.value);
  }
  ngOnDestroy(): void {
    typeof this.sub !== 'undefined' && (this.sub.unsubscribe());
  }
}
