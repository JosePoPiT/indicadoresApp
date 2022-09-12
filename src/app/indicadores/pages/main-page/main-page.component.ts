import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Indicadores } from '../../interfaces/indicadores.interface';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  themeControl: FormControl;
  
  indicators : Indicadores[] = [
    {id : 'dolar' , name: 'Dolares'},
    {id : 'euro' , name: 'Euros'},
    {id : 'uf' , name: 'UFs'},
    {id : 'ipc' , name: 'IPCs'},
    {id : 'utm' , name: 'UTMs'},
  ]

  hasSelectedIndicator: boolean = false;

  themeName: string = 'theme-light';
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private render2: Renderer2,
  ) {
    this.themeControl = new FormControl(false);
  }

  ngOnInit(): void {
    this.themeControl.valueChanges.subscribe((isDark) => {
      this.render2.removeClass(this.document.body, this.themeName);
      this.themeName = isDark ? 'theme-dark' : 'theme-light';
      this.render2.addClass(this.document.body, this.themeName);
    })
  }

  showIndicatorsDetail(indicatorName: string, category: string): void {
    this.hasSelectedIndicator = true;
    this.router.navigate([`indicadores/main/${category}`, indicatorName])
  }
}
