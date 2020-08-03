import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GanttViewerRoutingModule } from './gantt-viewer-routing.module';
import { GanttViewerComponent } from './components/main/gantt-viewer.component';
import {GanttModule} from '@syncfusion/ej2-angular-gantt';


@NgModule({
  declarations: [GanttViewerComponent],
  imports: [
    CommonModule,
    GanttViewerRoutingModule,
    GanttModule
  ]
})
export class GanttViewerModule { }
