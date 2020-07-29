import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanLoadCompsGuard } from './core/guards/can-load-comps-guard.guard';
import { CanloadloginGuard } from './core/guards/canloadlogin.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CanActivateLoginGuard } from './core/guards/can-activate-login.guard';
import { CanActivateCompsGuard } from './core/guards/can-activate-comps.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'todos', loadChildren: () => import('./features/todos/todos.module').then(m => m.TodosModule), canLoad:[CanLoadCompsGuard],canActivate:[CanActivateCompsGuard]},
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), canLoad:[CanLoadCompsGuard],canActivate:[CanActivateCompsGuard]},
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule), canLoad:[CanloadloginGuard],canActivate:[CanActivateLoginGuard] },
  { path: 'shared-with-me', loadChildren: () => import('./features/tods-shared/tods-shared.module').then(m => m.TodsSharedModule), canLoad:[CanLoadCompsGuard],canActivate:[CanActivateCompsGuard] },
  { path: 'profile', loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule), canLoad:[CanLoadCompsGuard],canActivate:[CanActivateCompsGuard] },
  {path:'**',component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
