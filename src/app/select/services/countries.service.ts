import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of, Observable, tap, map, combineLatest } from 'rxjs';

import { Country, Region, smallCountry } from '../interfaces/country.interface';

@Injectable({providedIn: 'root'})
export class CountriesService {
    private baseURL = 'https://restcountries.com/v3.1/';
    private params = '?fields=cca3,name,borders';

    private _regions: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

    constructor(
        private http: HttpClient
    ) { }

    get regions(): Region[] {
        return [...this._regions];
    }

    getCountriesByRegion(region: Region): Observable<smallCountry[]> {
        if(!region) return of ([]);

        const url: string = `${this.baseURL}region/${region}${this.params}`;
        return this.http.get<Country[]>(url)
            .pipe(
                map(countries => countries.map( country => ({
                    name: country.name.common,
                    cca3: country.cca3,
                    borders: country.borders ?? []
                }))),
                tap(response => console.log(response))
            );
    }

    getCountryByAlphaCode(alphaCode: string): Observable<smallCountry> {
        const url = `${this.baseURL}alpha/${alphaCode}${this.params}`;
        return this.http.get<Country>(url)
            .pipe(
                map(country => ({
                    name: country.name.common,
                    cca3: country.cca3,
                    borders: country.borders ?? []
                }))
            )
    }

    getCountryBordersByCodes(borders: string[]): Observable<smallCountry[]> {
        if(!borders || borders.length === 0) return of([]);

        const countriesRequest:Observable<smallCountry>[] = [];

        borders.forEach( code => {
            const request = this.getCountryByAlphaCode(code);
            countriesRequest.push(request);
        });

        return combineLatest(countriesRequest);

    }

}