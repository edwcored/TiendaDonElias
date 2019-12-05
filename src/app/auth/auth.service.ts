import { Injectable, Input } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { MENSAJES } from '../Constantes';
import { LOCALSTORESTR } from '../Constantes';
import { URLPERSONA } from '../Constantes';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private Usuario: any;

  @Input('usuario')
  get usuario(): any {
    if (!this.Usuario) {
      const usr = localStorage.getItem(LOCALSTORESTR.LS_USER);
      if (usr !== null) {
        this.Usuario = JSON.parse(usr);
        // this.loggedIn.next(true);
      }
    }
    return this.Usuario;
  }
  set usuario(val) {
    this.Usuario = val;
    localStorage.setItem(LOCALSTORESTR.LS_USER, JSON.stringify(this.Usuario));
  }

  public: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  public logged(state: boolean) {
    this.loggedIn.next(state);
  }

  logout() {
    localStorage.clear();

    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  validarPermiso(codigos: number[]): boolean {
    return true;
  }

  mostrarMensaje(mensaje: string, tipo: number): void {
    if (tipo === MENSAJES.ERROR) {
      this.toastr.error(mensaje);
    } else if (tipo === MENSAJES.SUSSES) {
      this.toastr.success(mensaje);
    } else {
      this.toastr.warning(mensaje);
    }
  }

  async getToken(): Promise<any> {
    const data = {
      nui: this.usuario.nui,
      nuiemp: this.usuario.emp.nui,
      rol: this.usuario.emp.rol,
      pwd: this.usuario.currentPassword
    };
    return await this.http.post(URLPERSONA.GETTOKEN, data).toPromise();
  }

}
