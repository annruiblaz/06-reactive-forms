import { Injectable } from '@angular/core';
import { Country, Region, smallCountry } from '../interfaces/country.interface';
import { HttpClient } from '@angular/common/http';
import { of, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountriesService {
    private baseURL = 'https://restcountries.com/v3.1/';

    private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

    constructor(
        private http: HttpClient
    ) { }

    get regions(): Region[] {
        return [...this._regions];
    }

    getCountriesByRegion(region: Region): Observable<smallCountry[]> {
        if(!region) return of ([]);

        const url: string = `${this.baseURL}region/${region}?fields=cca3,name,borders`;
        return this.http.get<smallCountry[]>(url)
            .pipe(
                tap(response => console.log(response))
            );
    }

}