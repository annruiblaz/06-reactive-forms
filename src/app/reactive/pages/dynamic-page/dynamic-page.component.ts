import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/validators.service';

@Component({
  selector: 'app-dynamic-page',
  templateUrl: './dynamic-page.component.html',
  styles: ``
})
export class DynamicPageComponent {

  public dynamicForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ])
  });

  public newFavorite: FormControl = new FormControl('',Validators.required);

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
  ) {}

  get favoriteGames() {
    return this.dynamicForm.get('favoriteGames') as FormArray;
  }

  isInvalidField(field: string) {
    return this.validatorsService.isInvalidField(this.dynamicForm, field);
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
    (this.dynamicForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.dynamicForm.reset();
  }

  onDeleteFavorite(index: number): void {
    this.favoriteGames.removeAt(index);
  }

  addToFavorites(): void {
    if (this.newFavorite.invalid) return;

    this.favoriteGames.push(
      this.fb.control(this.newFavorite.value, Validators.required)
    );

    (this.dynamicForm.controls['favoriteGAmes'] as FormArray) = this.fb.array([]);
    this.newFavorite.reset();
  }
}
