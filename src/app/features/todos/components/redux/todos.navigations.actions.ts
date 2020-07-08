import { createAction, props } from "@ngrx/store";

export const goToHome= createAction('[Todos - Navigation] todos home');
export const goToDetail= createAction('[Todos - Navigation] todos detail',props<{id:number}>());
export const goToEdit= createAction('[Todos - Navigation] todos edit',props<{id:number}>());
