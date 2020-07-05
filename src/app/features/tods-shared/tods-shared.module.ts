import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodsSharedRoutingModule } from './tods-shared-routing.module';
import { TodsSharedComponent } from './components/main/tods-shared.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodosFacadeService } from '../todos/components/services/todos-facade.service';


@NgModule({
  declarations: [TodsSharedComponent],
  providers: [TodosFacadeService],
  imports: [
    CommonModule,
    TodsSharedRoutingModule,
    SharedModule
  ]
})
export class TodsSharedModule { }
