import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GanttViewerComponent } from './components/main/gantt-viewer.component';

const routes: Routes = [{ path: '', component: GanttViewerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GanttViewerRoutingModule { }
