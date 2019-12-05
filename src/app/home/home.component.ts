import { Component, OnInit } from '@angular/core';
import { Producto } from '../models/productos.model';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Categorias = [];
  private linesToWrite: Array<Producto>;
  private filtro = {
    index: 0,
    tamano: 20
  };
  hayMasDatos = true;

  constructor(private appService: AppService) {
  }

  async ngOnInit() {
    this.Categorias = await this.appService.getCategorias();
    this.linesToWrite = new Array<Producto>();
  }

  onScroll() {
    if (this.hayMasDatos) {
      this.Cargar20();
      this.filtro.index++;
    }
  }

  async Cargar20() {
    const productos = await this.appService.getProducts(this.filtro);
    if (productos) {
      if (productos.length > 20) {
        productos.forEach(element => {
          this.linesToWrite.push(element);
        });
      } else {
        this.hayMasDatos = false;
      }
    }
  }
}
