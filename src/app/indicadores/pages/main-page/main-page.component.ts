import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Indicadores } from '../../interfaces/indicadores.interface';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  indicators : Indicadores[] = [
    {id : 'dolar' , name: 'Dolares'},
    {id : 'euro' , name: 'Euros'},
    {id : 'uf' , name: 'UFs'},
    {id : 'ipc' , name: 'IPCs'},
    {id : 'utm' , name: 'UTMs'},
  ];

  hasSelectedIndicator: boolean = false;
  themeClass: string = '';
  isLoadingContent: boolean = false;
  private childLoadingSubscription: any;

  constructor(@Inject(DOCUMENT) private document: Document, private router: Router) {}

  ngOnInit(): void {
    this.setThemeClass();
    // Escuchar cambios de clase en el body para actualizar el tema dinámicamente
    const observer = new MutationObserver(() => this.setThemeClass());
    observer.observe(this.document.body, { attributes: true, attributeFilter: ['class'] });
  }

  setThemeClass() {
    if (this.document.body.classList.contains('dark-theme')) {
      this.themeClass = 'main-dark';
    } else {
      this.themeClass = 'main-light';
    }
  }

  showIndicatorsDetail(indicatorName: string, category: string): void {
    this.hasSelectedIndicator = true;
    this.router.navigate([`indicadores/main/${category}`, indicatorName])
  }

  onChildActivate(componentRef: any) {
    // Si el hijo tiene isLoadingContent como observable o property, suscribirse o escuchar cambios
    if (this.childLoadingSubscription) {
      this.childLoadingSubscription.unsubscribe();
    }
    if ('isLoadingContent' in componentRef) {
      // Si es observable
      if (componentRef.isLoadingContent && typeof componentRef.isLoadingContent.subscribe === 'function') {
        this.childLoadingSubscription = componentRef.isLoadingContent.subscribe((val: boolean) => {
          this.isLoadingContent = val;
        });
      } else {
        // Si es property simple
        this.isLoadingContent = componentRef.isLoadingContent;
        // Escuchar cambios si el hijo emite eventos
        if ('loadingChange' in componentRef && componentRef.loadingChange.subscribe) {
          this.childLoadingSubscription = componentRef.loadingChange.subscribe((val: boolean) => {
            this.isLoadingContent = val;
          });
        }
      }
    } else {
      this.isLoadingContent = false;
    }
  }
}
