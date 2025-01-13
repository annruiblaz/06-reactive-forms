import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { switchMap } from 'rxjs';

import { Region, smallCountry } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: ``
})
export class SelectorPageComponent implements OnInit {
  public countriesByRegion: smallCountry[] = [];

  public selectorForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    borders: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.onRegionChanged();
  }

  get regions(): Region[] {
    return this.countriesService.regions;
  }

  onRegionChanged():void {
    this.selectorForm.get('region')!.valueChanges
    .pipe(
      switchMap(region => this.countriesService.getCountriesByRegion(region))
    )
    .subscribe( countries => {
      this.countriesByRegion = countries.sort( (c1, c2) => c1.name.localeCompare(c2.name));
    });
  }

}
