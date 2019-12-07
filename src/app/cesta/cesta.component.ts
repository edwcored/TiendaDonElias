import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AppService } from '../app.service';
import { RESULTS, MENSAJES } from '../Constantes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.scss']
})
export class CestaComponent implements OnInit {
  productos = [];
  sumaTotal = 0;
  sumaIva = 0;

  constructor(private appService: AppService, private authService: AuthService, private router: Router) { }

  async ngOnInit() {
    const res = await this.appService.getCar();
    if (res.resultCode === RESULTS.OK) {
      this.productos = res.data;

      this.productos.forEach(element => {
        element.vrIva = Math.round(element.precio * element.cant * element.iva / 100);
        element.total = (element.precio * element.cant) + element.vrIva;

        this.sumaIva += element.vrIva;
        this.sumaTotal += element.total;
      });
    }
  }

  Comprar() {
    localStorage.setItem('finalizando', '1');

    // valida si el usuario ya inicio sesion
    if (this.authService.usuario && this.authService.usuario.token) {
      this.router.navigate(['/compras']);
    } else {
      // se agrega una bandera para indicar q se esta realizando compra
      this.router.navigate(['/login']);
    }
  }

}
