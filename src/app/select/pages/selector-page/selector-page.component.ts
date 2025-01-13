import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { filter, switchMap, tap } from 'rxjs';

import { Region, smallCountry } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {
  public countriesByRegion: smallCountry[] = [];
  public borders: smallCountry[] = [];

  public selectorForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChanged();
    this.onCountryChanged();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChanged():void {
    this.selectorForm.get('region')!.valueChanges
    .pipe(
      tap( () => this.selectorForm.get('country')?.reset('')),
      tap( () => this.borders = []),
      switchMap(region => this.countriesService.getCountriesByRegion(region))
    )
    .subscribe( countries => {
      this.countriesByRegion = countries.sort( (c1, c2) => c1.name.localeCompare(c2.name));
    });
  }

  onCountryChanged():void {
    this.selectorForm.get('country')!.valueChanges
    .pipe(
      tap( () => this.selectorForm.get('border')!.setValue('')),
      filter( (value: string) => value.length > 0),
      switchMap( (alphaCode) => this.countriesService.getCountryByAlphaCode(alphaCode)),
      switchMap( (country) => this.countriesService.getCountryBordersByCodes(country.borders))
    )
    .subscribe( countries => {
      this.borders = countries;
    });
  }

}
