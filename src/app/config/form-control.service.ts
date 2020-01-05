import { Injectable } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl, form: FormGroupDirective | NgForm): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Injectable({
  providedIn: 'root'
})
export class FormControlService {

  public matcher: ErrorStateMatcher;

  constructor() {
    this.matcher = new FormErrorStateMatcher();
  }

  public createRequired() {
    return new FormControl('', [
      Validators.required
    ]);
  }
}