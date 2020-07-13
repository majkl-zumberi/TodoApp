import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { goToDetail, goToHome, goToEdit, goToHomepage } from './todos.navigations.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodosFacadeService } from '../services/todos-facade.service';
import { tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';



@Injectable()
export class TodoNavigationsEffects{

  constructor(private actions$:Actions,private facade:TodosFacadeService){}

  goToDetail$:Observable<Action>=createEffect(()=>this.actions$.pipe(
    //filtro l'azione se è di tipo goToDetail allora va nello switchMap
    ofType(goToDetail),
    //dopo il dispatch
    tap(action=>this.facade.goToDetail(action.id))

  ),{dispatch:false});

  goToHome$:Observable<Action>=createEffect(()=>this.actions$.pipe(
    //filtro l'azione se è di tipo goToDetail allora va nello switchMap
    ofType(goToHome),
    //dopo il dispatch
    tap(action=>this.facade.goToTodosHome())

  ),{dispatch:false});

  goToHomepage$:Observable<Action>=createEffect(()=>this.actions$.pipe(
    //filtro l'azione se è di tipo goToDetail allora va nello switchMap
    ofType(goToHomepage),
    //dopo il dispatch
    tap(action=>this.facade.goToHome())

  ),{dispatch:false});

  goToEdit$:Observable<Action>=createEffect(()=>this.actions$.pipe(
    //filtro l'azione se è di tipo goToDetail allora va nello switchMap
    ofType(goToEdit),
    //dopo il dispatch
    tap(action=>this.facade.goToEdit(action.id))

  ),{dispatch:false});
}
