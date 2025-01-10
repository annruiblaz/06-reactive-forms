import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const rtx5090 = {
  name: 'RTX5090',
  price: 1999,
  inStorage: 50
}

@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
  styles: ``
})
export class BasicPageComponent implements OnInit{

/*   public myForm: FormGroup = new FormGroup({
    name: new FormControl('',[]),
    price: new FormControl('',[]),
    isStorage: new FormControl('',[])
  }); */

  public basicForm: FormGroup = this.fb.group({
    name: ['',[Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]]
  });

  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    //this.basicForm.reset(rtx5090);
  }

  isInvalidField(field: string) {
    return this.basicForm.controls[field].errors && this.basicForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.basicForm.controls[field]) return null;

    const errors = this.basicForm.controls[field].errors || {};

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


  onSave(): void {

    if (this.basicForm.invalid) {
      this.basicForm.markAllAsTouched();
      return;
    };

    this.basicForm.reset({price: 0, inStorage: 0});
  }
}
