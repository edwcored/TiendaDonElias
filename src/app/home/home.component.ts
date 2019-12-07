import { Component, OnInit, asNativeElements } from '@angular/core';
import { Producto } from '../models/productos.model';
import { AppService } from '../app.service';
import { RESULTS, MENSAJES } from '../Constantes';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Categorias = [];
  CategoriasSeleccionadas = [];
  cantidades = [];

  private linesToWrite: Array<Producto>;
  private filtro = {
    index: 0,
    tamano: 20,
    nombre: ''
  };
  hayMasDatos = true;

  constructor(private appService: AppService, private authService: AuthService) {
  }

  async ngOnInit() {
    this.linesToWrite = new Array<Producto>();

    await this.CargarCategorias(0);
  }

  async CargarCategorias(indice: number) {
    const cat = [];
    for (let i = 0; i < indice; i++) {
      cat.push(this.CategoriasSeleccionadas[i]);
    }
    const res = await this.appService.getCategorias(cat);
    if (res.data && res.data.length > 0) {
      this.Categorias[this.Categorias.length] = res.data;
    }

    this.filtro.index = 0;
    this.hayMasDatos = true;
    this.linesToWrite.length = 0;
    this.CargarN();
  }

  selectCat(indice: number) {
    if (indice + 1 < this.CategoriasSeleccionadas.length) {
      this.CategoriasSeleccionadas.length = indice + 1;
      this.Categorias.length = indice + 1;
    }
    this.CargarCategorias(indice + 1);
  }

  onScroll() {
    if (this.hayMasDatos) {
      this.CargarN();
      this.filtro.index++;
    }
  }

  async CargarN() {
    const fil = {
      index: this.filtro.index,
      tamano: this.filtro.tamano,
      categorias: this.CategoriasSeleccionadas,
      nombre: this.filtro.nombre
    };

    const res = await this.appService.getProducts(fil);
    if (res.data) {
      res.data.forEach(element => {
        this.linesToWrite.push(element);
        this.cantidades[element._id] = 1;
      });

      if (res.data.length < 20) {
        this.hayMasDatos = false;
      }
    }
  }

  async Buscar() {
    this.hayMasDatos = true;
    this.linesToWrite.length = 0;
    this.filtro.index = 0;
    this.CargarN();
  }

  async Agregar(index: number) {
    const data = {
      _id: index,
      cant: this.cantidades[index]
    };

    const res = await this.appService.addToCar(data);
    if (res.resultCode === RESULTS.OK) {
      this.authService.mostrarMensaje('Producto Agregado a la sesta', MENSAJES.SUSSES);
    } else if (res.resultCode === RESULTS.REPITED) {
      this.authService.mostrarMensaje('Se reemplazaron las cantidades en la cesta', MENSAJES.WARN);
    }
  }
}
