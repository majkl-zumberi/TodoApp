import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/core/model/todo.interface';
import { getFirstTodo } from 'src/app/redux';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  get todo(): Observable<Todo>{
    return this.store.pipe(select(getFirstTodo));
  }

  constructor(private store: Store) { 
  }

  ngOnInit(): void {
  }

}
