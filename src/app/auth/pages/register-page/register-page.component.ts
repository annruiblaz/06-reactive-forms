import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators.helpers';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  public registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(customValidators.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(customValidators.emailPattern)]],
    username: ['', [Validators.required, customValidators.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],

  })

  constructor(private fb: FormBuilder) {
  }

  isInvalidField() {

  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
  }
}
