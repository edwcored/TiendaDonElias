import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { RESULTS } from '../Constantes';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {
  compras = [];
  verDetalle = false;
  detalle = {};

  constructor(private appService: AppService) { }

  async ngOnInit() {
    if (localStorage.getItem('finalizando')) {
      await this.finalizarCompra();
    }

    const res = await this.appService.getCompras();
    if (res.resultCode === RESULTS.OK) {
      this.compras = res.data;
    }
  }

  async finalizarCompra() {
    localStorage.removeItem('finalizando');
    await this.appService.finishCar();
  }

  ver(id) {
    this.detalle = this.compras.find(x => x._id === id);
    this.verDetalle = true;
  }

  volver() {
    this.verDetalle = false;
  }
}
