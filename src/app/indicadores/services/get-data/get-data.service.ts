import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency, CurrencyData } from '../../interfaces/currency.interface';
import { Observable } from 'rxjs'
import { DateSelected } from '../../interfaces/date.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresService {

  apiKey: string = '7d08d2763a62e2a43c4e3c91ecdaf29f7ba45fe4';

  baseUrl: string = 'https://api.sbif.cl/api-sbifv3/recursos_api';

  utm = 'utm/posteriores/2022/02?apikey=7d08d2763a62e2a43c4e3c91ecdaf29f7ba45fe4&formato=json'

  constructor( private http : HttpClient) { }

  // INDICADORES DETAILS

  public getDolaresMensual() {
    return this.http.get<CurrencyData>('https://api.sbif.cl/api-sbifv3/recursos_api/dolar/2022/08?apikey=7d08d2763a62e2a43c4e3c91ecdaf29f7ba45fe4&formato=json')
  }

  public getEurosMensual() {
    return this.http.get<CurrencyData>('https://api.cmfchile.cl/api-sbifv3/recursos_api/euro/2022/08?apikey=7d08d2763a62e2a43c4e3c91ecdaf29f7ba45fe4&formato=json')
  }

  public getUfMensual() {
    return this.http.get<CurrencyData>('https://api.cmfchile.cl/api-sbifv3/recursos_api/uf/2022/08?apikey=7d08d2763a62e2a43c4e3c91ecdaf29f7ba45fe4&formato=json')
  }

  public getIPCAnual() {
    return this.http.get<CurrencyData>('https://api.cmfchile.cl/api-sbifv3/recursos_api/ipc/2022?apikey=7d08d2763a62e2a43c4e3c91ecdaf29f7ba45fe4&formato=json')
  }

  public getUTMAnual() {
    return this.http.get<CurrencyData>('https://api.cmfchile.cl/api-sbifv3/recursos_api/utm/2022?apikey=7d08d2763a62e2a43c4e3c91ecdaf29f7ba45fe4&formato=json')
  }

  // INDICADORES GRAPHICS

  public getCurrencyData(id: string, action: 'day' | 'month', daysBehind = 10): Observable<Currency[]> {
    // return this.http.get<CurrencyData>(`${this.baseUrlCurrentCurrency}/${id}?apikey=${this.apiKey}&formato=json`);
    const dynamicDate = this.getDynamicDate(action, daysBehind);
    const dynamicUrl = this.getDynamicUrl(action, dynamicDate);
    return this.http.get<CurrencyData>(`${this.baseUrl}/${id}/periodo/${dynamicUrl}/?apikey=${this.apiKey}&formato=json`)
      .pipe(
        map((currency: CurrencyData) => {
          const currencyArr: Currency[] = Object.values(currency)[0].map((currencyResp) => {
            currencyResp.Valor = (currencyResp.Valor as string).replace('.', '');
            currencyResp.Valor = Number((currencyResp.Valor as string).replace(',', '.'));
            return currencyResp;
          });
          return currencyArr;
        })
      )
  }

  getDynamicDate(action: 'day' | 'month', daysBehind: number): DateSelected {
    const date = new Date();
    if(action === 'day') {
      date.setDate(date.getDate() - daysBehind);
    } else {
      date.setMonth(date.getMonth() - 12);

    }
    return {
      dayNumber: date.getDate(),
      monthNumber: date.getMonth() + 1,
      year: date.getFullYear(),
    };
  }

  getDynamicUrl(action: 'day' | 'month', fromDate: DateSelected): string {
    const currentDate = new Date();
    let fromDateUrl: string;
    let currentDateUrl: string;
    if(action === 'day') {
      fromDateUrl = `${fromDate.year}/${fromDate.monthNumber}/dias_i/${fromDate.dayNumber}`;
      currentDateUrl = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/dias_f/${currentDate.getDate()}`;
    } else {
      fromDateUrl = `${fromDate.year}/${fromDate.monthNumber}`;
      currentDateUrl = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}`;
    }

    return `${fromDateUrl}/${currentDateUrl}`;
  }
  
}


