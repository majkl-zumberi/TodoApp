import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanLoadCompsGuard } from './core/guards/can-load-comps-guard.guard';
import { CanloadloginGuard } from './core/guards/canloadlogin.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'todos', loadChildren: () => import('./features/todos/todos.module').then(m => m.TodosModule), canLoad:[CanLoadCompsGuard] },
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), canLoad:[CanLoadCompsGuard]},
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule), canLoad:[CanloadloginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
