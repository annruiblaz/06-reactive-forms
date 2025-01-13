import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {
    constructor() { }

    validate(control: AbstractControl): Observable<ValidationErrors | null> {
        const email = control.value;
        console.log({email});

        const httpCallObservable = new Observable<ValidationErrors | null>( (subscriber) => {
            console.log({email});
            if (email === 'anna@gmail.com') {
                subscriber.next({emailTaken: true});
                subscriber.complete();
                //return;
            }

            subscriber.next(null);
            subscriber.complete();
        })
        .pipe(delay(2000))

        return httpCallObservable;
    }

}