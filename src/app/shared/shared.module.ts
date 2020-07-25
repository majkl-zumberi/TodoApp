import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextComponent } from './components/input-text/input-text.component';
import { TodoPreviewComponent } from './components/todo-preview/todo-preview.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { MultiSelectAllModule } from '@syncfusion/ej2-angular-dropdowns';
@NgModule({
  declarations: [
    InputTextComponent,
    TodoPreviewComponent,
    TodoItemComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectAllModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    TodoPreviewComponent,
    TodoItemComponent,
    TodoFormComponent,
    MultiSelectAllModule
  ]
})
export class SharedModule { }
