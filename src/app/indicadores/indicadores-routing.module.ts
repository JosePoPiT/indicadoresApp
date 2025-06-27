import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { GraphicPageComponent } from './pages/graphic-page/graphic-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes : Routes = [
  {
    path: 'indicadores',
    children: [
      {
        path: '',
        component: HomePageComponent
      },
      {
        path: 'main',
        component: MainPageComponent,
        children: [
          {
            path: 'detail/:id',
            component: DetailPageComponent,
          },
          {
            path: 'graphic/:id',
            component: GraphicPageComponent,
          },
          {
            path: 'error',
            component: ErrorPageComponent,
          },
        ]
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'indicadores'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class IndicadoresRoutingModule { }
