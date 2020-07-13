import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import {
  Store,
  select
} from '@ngrx/store';
import {
  selectCurrentUser
} from 'src/app/redux';
import {
  User
} from 'src/app/core/model/user.interface';
import {
  Subscription
} from 'rxjs';

@Component({
  selector: 'app-profile-render',
  templateUrl: './profile-render.component.html',
  styleUrls: ['./profile-render.component.scss']
})
export class ProfileRenderComponent implements OnInit, OnDestroy {

  iniziali: string;
  username: string;
  private sub: Subscription;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.sub = this.store.pipe(select(selectCurrentUser)).subscribe(user => {
      user=user??{}as User;
      this.iniziali = user.name && user.surname ?(user.name.substring(0, 1) + user.surname.substring(0, 1)).toUpperCase():'';
      this.username = user.username;
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
