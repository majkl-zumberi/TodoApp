import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  get usernameControl():FormControl{
    return this.loginForm.get('username') as FormControl;
    }
    get passwordControl():FormControl{
    return this.loginForm.get('password') as FormControl;
    }


  constructor(private fb:FormBuilder) {
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
  }

}
