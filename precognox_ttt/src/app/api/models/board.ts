/* tslint:disable */
/* eslint-disable */
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface Board {
  id?: number;
  board: string;
  name: string | undefined;
}

export function createFormGroup() {
  return new FormGroup({
    name: new FormControl('', [Validators.required]),
  });
}
