import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodsSharedComponent } from './components/main/tods-shared.component';

const routes: Routes = [{ path: '', component: TodsSharedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodsSharedRoutingModule { }
