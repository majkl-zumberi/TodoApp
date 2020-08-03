import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {selectTodos} from '../../../redux';

@Component({
  selector: 'app-gantt-viewer',
  templateUrl: './gantt-viewer.component.html',
  styleUrls: ['./gantt-viewer.component.scss']
})
export class GanttViewerComponent implements OnInit {



  constructor(private store:Store) { }
  public taskSettings: object;
  public datsa: Object[];
  ngOnInit(): void {
    this.store.pipe(select(selectTodos)).subscribe(todos=>{

     this.datsa= todos.map(todo=>{
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
