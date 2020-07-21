import {
  Injectable
} from '@angular/core';
import {
  User
} from 'src/app/core/model/user.interface';
import {
  Router
} from '@angular/router';
import {
  Store
} from '@ngrx/store';
import {
  initUser,
  removeUser,
  loginUser,
  signUpUser
} from 'src/app/redux/user/auth.actions';
import {
  Subject,
  Observable,
  timer
} from 'rxjs';
import {
  HttpClient
} from '@angular/common/http';
import {
  AsyncValidatorFn
} from 'src/app/core/model/asyncValidator.interface';
import {
  AbstractControl
} from '@angular/forms';
import {
  map, switchMap
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {
  private errMessageSource = new Subject < string > ();
  errMessage$ = this.errMessageSource.asObservable();
  constructor(private router: Router, private Store: Store, private http: HttpClient) {}

  signIn(username: string, password: string) {
    this.Store.dispatch(loginUser({
      username,
      password
    }));
  }

  signOut() {
    sessionStorage.removeItem('utente');
    this.Store.dispatch(removeUser({}));
    this.router.navigateByUrl("/auth/login");
  }

  signUp(username: string, password: string) {
    this.Store.dispatch(signUpUser({
      username,
      password
    }));
  }

  searchUser(text) {
    const URL = 'http://localhost:3000';
    // debounce
    return timer(1000)
      .pipe(
        switchMap(() => {
          // Check if username is available
          return this.http.get<any>(`${URL}/users?username=${text}`)
        })
      );
  }
  userValidator(): AsyncValidatorFn {

    return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
      return this.searchUser(control.value)
        .pipe(
          map(res => {
            // return a custom error if username is taken (result is an array with one or more elements),
            // otherwise return no error if the array is empty
            return (res.length) ? {
              'userNameExists': true
            } : null
          }))
    }
  }
}
