import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./indicadores/indicadores.module').then( m => m.IndicadoresModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo : '404'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
