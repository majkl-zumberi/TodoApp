import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './components/main/todos.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';


@NgModule({
  declarations: [TodosComponent, TodoEditComponent, TodoDetailComponent],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
