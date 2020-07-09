import { Injectable } from '@angular/core';
import { HttpCommunicationsService } from '../http-communications/http-communications.service';
import { User } from '../model/user.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServerService {

  constructor(private httpCommunications: HttpCommunicationsService) { }
  retrieveAllUsers(): Observable<User[]>{
    return this.httpCommunications.retrieveGetCall<User[]>("users");
  }
  registerUser(user:User):Observable<User>{
    return this.httpCommunications.retrievePostCall<User>("users",user);
  }
}
