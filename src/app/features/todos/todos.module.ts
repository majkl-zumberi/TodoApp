import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './components/main/todos.component';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TodosFacadeService } from './components/services/todos-facade.service';
import { EffectsModule } from '@ngrx/effects';
import { TodoNavigationsEffects } from './components/redux/todos.navigations.effects';
import {CalendarModule, DatePickerModule} from '@syncfusion/ej2-angular-calendars';


@NgModule({
  declarations: [TodosComponent, TodoEditComponent, TodoDetailComponent],
  providers: [TodosFacadeService],
  imports: [
    CommonModule,
    TodosRoutingModule,
    SharedModule,
    CalendarModule,
    EffectsModule.forFeature([TodoNavigationsEffects]),
    DatePickerModule
  ]
})
export class TodosModule { }
