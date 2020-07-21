import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import {
  AuthFacadeService
} from '../services/auth-facade.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  passwordMessage: string;
  registerForm: FormGroup;
  get usernameControl(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }

  constructor(private fb: FormBuilder, private authFacadeService: AuthFacadeService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required,this.authFacadeService.userValidator()],
      pswGroup: this.fb.group({
        password: ['', Validators.required],
        passwordCnf: ['', Validators.required],
      }, {
        validator: this.checkPasswords
      })
    });
  }
  registerUser() {
    console.log("username:" + this.registerForm.get("username").value);
    console.log("password:" + this.registerForm.get("pswGroup").get("password").value);
    this.authFacadeService.signUp(this.registerForm.get("username").value,this.registerForm.get("pswGroup").get("password").value);
  }

  checkPasswords(c: AbstractControl): { [key: string]: boolean } | null {
    const emailControl = c.get('password');
    const confirmControl = c.get('passwordCnf');

    if (emailControl.pristine || confirmControl.pristine) {
      return null;
    }

    if (emailControl.value === confirmControl.value) {
      return null;
    }
    return { match: true };
  }



  ngOnInit(): void {

  }

}
