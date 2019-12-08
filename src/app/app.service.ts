import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLSPRODUCTOS, URLCESTA, URLCOMPRAS } from './Constantes';
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
    return this.http.post(URLSPRODUCTOS.CATEGORIAS, params).toPromise();
  }

  async addToCar(params: any): Promise<any> {
    return this.http.post(URLCESTA.ADD, params).toPromise();
  }

  async getCar(): Promise<any> {
    // se usa un post para q no se cachee en pwa
    return this.http.post(URLCESTA.GET, {}).toPromise();
  }

  async finishCar(): Promise<any> {
    // se usa un post para q no se cachee en pwa
    return this.http.post(URLCESTA.FINISH, {}).toPromise();
  }

  async getCompras(): Promise<any> {
    // se usa un post para q no se cachee en pwa
    return this.http.post(URLCOMPRAS.GET, {}).toPromise();
  }

  async validarCupon(params: any): Promise<any> {
    // se usa un post para q no se cachee en pwa
    return this.http.post(URLCESTA.VALIDARCUPON, params).toPromise();
  }
}
