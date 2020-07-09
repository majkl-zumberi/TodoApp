import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthFacadeService } from '../services/auth-facade.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginError:string='';
  loginForm: FormGroup;
  private sub:Subscription;
  get usernameControl():FormControl{
    return this.loginForm.get('username') as FormControl;
    }
    get passwordControl():FormControl{
    return this.loginForm.get('password') as FormControl;
    }


  constructor(private fb:FormBuilder,private authFacadeService:AuthFacadeService) {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
      });
   }

  ngOnInit(): void {
  }

  loginUser(){
    console.log("username:"+this.usernameControl.value);
    console.log("password:"+this.passwordControl.value);
    //this.authFacadeService.signIn(this.usernameControl.value,this.passwordControl.value);
    this.sub=this.authFacadeService.errMessage$.subscribe(message=>{
      this.loginError=message;
      console.log(message);
    });
    this.authFacadeService.signIn(this.usernameControl.value,this.passwordControl.value);
  }
  ngOnDestroy(): void {
    typeof this.sub !== 'undefined' && (this.sub.unsubscribe());
  }
}
