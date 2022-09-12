import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {LOCALE_ID} from '@angular/core';
import localeDECH from '@angular/common/locales/es-CL';

import { MaterialModule } from '../material/material.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';

import { NgChartsModule } from 'ng2-charts';
import { IndicadoresRoutingModule } from './indicadores-routing.module';

import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { GraphicPageComponent } from './pages/graphic-page/graphic-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';



registerLocaleData(localeDECH);

@NgModule({
  declarations: [
    DetailPageComponent,
    GraphicPageComponent,
    HomePageComponent,
    MainPageComponent,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatCardModule,
    MatListModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSortModule,
    MatToolbarModule,
    NgChartsModule,
    IndicadoresRoutingModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CL' },
  ]
})
export class IndicadoresModule { }
