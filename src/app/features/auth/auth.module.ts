import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './components/main/auth.component';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AuthComponent,LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class AuthModule { }
