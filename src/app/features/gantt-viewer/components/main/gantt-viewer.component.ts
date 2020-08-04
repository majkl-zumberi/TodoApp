import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectTodos} from '../../../../redux';
import {Todo} from '../../../../core/model/todo.interface';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-gantt-viewer',
  templateUrl: './gantt-viewer.component.html',
  styleUrls: ['./gantt-viewer.component.scss']
})
export class GanttViewerComponent implements OnInit {

  get ganttData():Observable<any>{
    return this.store.pipe(select(selectTodos)).pipe(
      map((todos:Todo[])=>{
        return todos.map(todo=>{
          let subtasks=todo.steps.map(task=>{
            return{
              TaskID:task.id,
              TaskName:task.title,
              StartDate:new Date(task.StartDate),
              Duration:task.Duration
            }

          });
          return{
            TaskID: todo.id,
            TaskName:todo.title,
            StartDate:new Date(todo.StartDate),
            EndDate:new Date(todo.EndDate),
            subtasks: [...subtasks],

          }

        });
      })
    );
  }

  constructor(private store:Store) { }
  public taskSettings: object;
  ngOnInit(): void {

    this.taskSettings = {
      id: 'TaskID',
      name: 'TaskName',
      startDate: 'StartDate',
      endDate: 'EndDate',
      duration: 'Duration',
      child: 'subtasks'
    };
  }


}
