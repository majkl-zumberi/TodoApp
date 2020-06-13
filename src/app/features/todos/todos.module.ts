import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './components/main/todos.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodosFacadeService } from './components/services/todos-facade.service';


@NgModule({
  declarations: [TodosComponent, TodoEditComponent, TodoDetailComponent],
  providers: [TodosFacadeService],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule
  ]
})
export class TodosModule { }
