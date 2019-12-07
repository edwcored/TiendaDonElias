import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSPRODUCTOS, DOMINIOVALOR, URLCESTA } from './Constantes';
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

  async getCategorias(params: any): Promise<any> {
    return this.http.post(DOMINIOVALOR.CATEGORIAS, params).toPromise();
  }

  async addToCart(params: any): Promise<any> {
    return this.http.post(URLCESTA.ADD, params).toPromise();
  }


}
