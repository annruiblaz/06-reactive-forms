import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public dynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(5)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  })

  constructor( private fb: FormBuilder) {}

  get favoriteGames() {
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }

  isInvalidField(field: string) {
    return this.dynamicForm.controls[field].errors && this.dynamicForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.dynamicForm.controls[field]) return null;

    const errors = this.dynamicForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch(key) {
        case 'required':
          return 'Este campo es requerido.';

        case 'minLength':
          return `Este campo requiere mínimo ${errors['minLength'].requiredLength} letras.`;
      }
    }
    return null;
  }

  isValidFieldInArray(formArray: FormArray, i: number) {
    return formArray.controls[i].errors && formArray.controls[i].touched;
  }

  onSubmit(): void {
    if (this.dynamicForm.invalid) {
      this.dynamicForm.markAllAsTouched();
      return;
    }

    console.log(this.dynamicForm.value);
    this.dynamicForm.reset();

  }
}
