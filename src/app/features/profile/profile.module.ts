import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';

import { ProfileRenderComponent } from 'src/app/shared/components/profile-render/profile-render.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './components/main/profile.component';


@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule
  ]
})
export class ProfileModule { }
