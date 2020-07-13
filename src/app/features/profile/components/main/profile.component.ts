import { Component, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from 'src/app/redux';
import { User } from 'src/app/core/model/user.interface';
import { ProfileFacadeService } from '../services/profile-facade.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit,OnDestroy{
  profileForm:FormGroup;
  user:User;
  private sub:Subscription;
  constructor(private fb:FormBuilder,private store:Store,private service:ProfileFacadeService) {
    this.profileForm=this.fb.group({
      name:['',Validators.required],
      surname:['',Validators.required],
      id:['']
      });
  }

  ngOnInit(): void {
  this.sub=this.store.select(selectCurrentUser).subscribe(user=>{
    this.profileForm.patchValue({
      name:user.name,
      surname:user.surname,
      id:user.id
    })
  })
  this.profileForm.markAsUntouched();
  this.profileForm.markAsPristine();
  }

  updateUser(){
    console.log("pronto ad aggiornare l'utente");
    this.service.editUser(this.profileForm.value);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
