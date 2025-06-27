import { Component, EventEmitter, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Currency } from '../../interfaces/currency.interface';

import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { IndicadoresService } from '../../services/get-data/get-data.service';
import { switchMap } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ErrorDetails } from '../../interfaces/error.interface';
import { ErrorService } from '../../services/error/error.service';


@Component({
  selector: 'app-graphic-page',
  templateUrl: './graphic-page.component.html',
  styleUrls: ['./graphic-page.component.scss'],
})
export class GraphicPageComponent implements OnInit {

  isLoadingContent: boolean = false;
  @Output() loadingChange = new EventEmitter<boolean>();
  errorDetails: ErrorDetails | null = null;
  currencyName : string = '';
  CurrencyData: Currency = { Valor: 0, Fecha: ''};
  action!: 'day' | 'month';

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: '',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: []
  };

 
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(0,0,0,0.3)',
        },
        ticks: {
          color: '#11ab11'
        }
      }
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  constructor(
              private activatedRoute : ActivatedRoute,
              private router: Router,
              private indicadoresService : IndicadoresService,
              private errorService: ErrorService,
              private cdr: ChangeDetectorRef
              ) {}

  ngOnInit(): void {
    console.log('GraphicPageComponent ngOnInit iniciado');
    console.log('URL actual:', window.location.href);
    console.log('ActivatedRoute snapshot:', this.activatedRoute.snapshot);
    console.log('ActivatedRoute snapshot params:', this.activatedRoute.snapshot.params);
    this.activatedRoute.params.subscribe(params => {
      this.getInfo(params['id']);
    });
  }
  
  getInfo(id: string) {
    console.log('getInfo() iniciado');
    this.isLoadingContent = true;
    this.loadingChange.emit(true);
    
    let action: 'day' | 'month' = (id === 'ipc' || id === 'utm') ? 'month' : 'day';
    this.currencyName = id;
    console.log('currencyName asignado:', this.currencyName);
    console.log('Action asignado:', action);
    
    this.indicadoresService.getCurrencyData(id, action).subscribe({
      next: (currencyArr: Currency[]) => {
        console.log('Datos recibidos del servicio:', currencyArr);
        this.CurrencyData = currencyArr[currencyArr.length - 1];
        this.lineChartData.datasets[0].data = currencyArr.map((currency) => currency.Valor as number);
        this.lineChartData.datasets[0].label = this.currencyName.toUpperCase();
        this.lineChartData.labels = currencyArr.map((currency) => currency.Fecha);
        this.chart?.update();
        console.log('Gráfico actualizado');
        this.isLoadingContent = false;
        this.cdr.detectChanges();
        this.loadingChange.emit(false);
      },
      error: (error) => {
        console.error('Error en getInfo:', error);
        const { name, message } = error as ErrorDetails;
        this.errorDetails = { name, message };
        this.errorService.errorDetails = this.errorDetails;
        this.router.navigate(['/indicadores/main/error']);
        this.isLoadingContent = false;
        this.cdr.detectChanges();
        this.loadingChange.emit(false);
      }
    });
  }

}
