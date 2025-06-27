import { Component, OnInit, AfterViewInit, ViewChild, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { IndicadoresService } from '../../services/get-data/get-data.service';
import { tap } from 'rxjs/operators';
import { switchMap } from 'rxjs';
import { Currency } from '../../interfaces/currency.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumnsDetails : string[] = ['valor', 'fecha'];

  action!: 'day' | 'month';
  
  displayedColumns: string[] = ['Valor', 'Fecha'];

  dataSource!: MatTableDataSource<Currency>;

  resultsLength: number = 0;
  
  pageIndex: number = 0;

  pageSize: number = 5;

  isLoadingContent = false;
  @Output() loadingChange = new EventEmitter<boolean>();
  data: Currency[] = [];

  constructor(
    private activateRoute: ActivatedRoute,
    private indicadoresService: IndicadoresService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      this.loadData(params['id']);
    });
  }

  ngAfterViewInit(): void {
    this.getInfo();
  }

  
  getInfo() {
    this.activateRoute.params 
      .pipe(
        tap((params) => {
          if(params['id'] === 'ipc' || params['id'] === 'utm') {
            this.action = 'month';
          } else {
            this.action = 'day';
          }
        }),
        switchMap((params) => this.indicadoresService.getCurrencyData(params['id'], this.action, 30))
      )
      .subscribe((currencyArr) => {
        this.dataSource = new MatTableDataSource(currencyArr);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
  }

  loadData(id: string) {
    this.isLoadingContent = true;
    this.loadingChange.emit(true);
    this.indicadoresService.getCurrencyData(id, 'day').subscribe({
      next: (data: Currency[]) => {
        this.data = data;
        this.isLoadingContent = false;
        this.cdr.detectChanges();
        this.loadingChange.emit(false);
      },
      error: () => {
        this.isLoadingContent = false;
        this.cdr.detectChanges();
        this.loadingChange.emit(false);
      }
    });
  }

}
