import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:max-line-length
import {
  URLPERSONA
} from '../Constantes';
import { promise } from 'protractor';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }

  async GetUser(params: any): Promise<any> {
    return this.http.post(URLPERSONA.VALIDARUSUARIOURL, params).toPromise();
  }

  async SolicitarCambioClave(data: string): Promise<any> {
    return this.http.post(URLPERSONA.SOLICITARCAMBIOCLAVE, data).toPromise();
  }

  async RealizarCambioClave(data): Promise<any> {
    return this.http.post(URLPERSONA.REALIZARCAMBIOCLAVE, data).toPromise();
  }

  async RealizarCambioClaveLocal(data): Promise<any> {
    return this.http.post(URLPERSONA.REALIZARCAMBIOCLAVELOCAL, data).toPromise();
  }

  async CreateUser(data): Promise<any> {
    return this.http.post(URLPERSONA.CREARUSUARIO, data).toPromise();
  }

}
