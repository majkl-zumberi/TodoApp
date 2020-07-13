import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd ,Event } from '@angular/router';
import { AuthFacadeService } from 'src/app/features/auth/components/services/auth-facade.service';
import { Session } from 'protractor';
import { User } from 'src/app/core/model/user.interface';
import { Store, select } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/redux';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  username:string;
  iniziali:string;
  currentRoute:string;
  constructor(private router:Router,private fs:AuthFacadeService) { }

  ngOnInit(): void {

    this.router.events.subscribe((event:Event) => {
      if(event instanceof NavigationEnd) {
        console.log(event.url);
        this.currentRoute=event.url;
      }
      // NavigationEnd
      // NavigationCancel
      // NavigationError
      // RoutesRecognized
    });
  }
  signOut(){
    console.log("user try to logout");
    this.fs.signOut();
  }
}
