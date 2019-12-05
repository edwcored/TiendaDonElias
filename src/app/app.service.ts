import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSPRODUCTOS, DOMINIOVALOR } from './Constantes';
import { Observable } from 'rxjs';
import { Producto } from './models/productos.model';

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

  async createProduct(params: any): Promise<any> {
    return this.http.post(URLSPRODUCTOS.CREATE, params).toPromise();
  }

  async getCategorias(): Promise<any> {
    return this.http.get(DOMINIOVALOR.CATEGORIAS).toPromise();
  }

  
}
