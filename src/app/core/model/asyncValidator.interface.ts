import { AbstractControl } from '@angular/forms';
import { ValidationErrors } from './validationErrors';
import { Observable } from 'rxjs';

export interface AsyncValidatorFn {
  (c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>;
}
