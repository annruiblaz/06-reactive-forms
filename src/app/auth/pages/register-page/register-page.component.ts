import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidators from '../../../shared/validators/validators.helpers';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styles: ``
})
export class RegisterPageComponent {
  public registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],

  })

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {
  }

  isInvalidField(field: string) {
    return this.validatorsService.isInvalidField(this.registerForm, field );
  }

  onSubmit() {
    this.registerForm.markAllAsTouched();
  }
}
