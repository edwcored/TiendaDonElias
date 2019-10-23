import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSPRODUCTOS } from './Constantes';
import { Observable } from 'rxjs';
import { Fact } from './models/productos.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  async getProducts(params: any): Promise<any> {
    return this.http.post(URLSPRODUCTOS.GETN, params).toPromise();
  }

  async getProduct(params: any): Promise<any> {
    return this.http.post(URLSPRODUCTOS.GET, params).toPromise();
  }

  getRandomFact(): Observable<Fact[]> {
    const month = Math.floor(Math.random() * 11) + 1;
    let maxDay = 30;
    if (month === 2) {
      maxDay = 27;
    } else if ([4, 6, 9, 11].includes(month)) {
      maxDay = 29;
    }
    const day = Math.floor(Math.random() * maxDay) + 1;
    return this.http.get<Fact[]>(`http://numbersapi.com/${month}/${day}/date?json`);
  }
}
