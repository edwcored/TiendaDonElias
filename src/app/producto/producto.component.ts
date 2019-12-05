import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { MENSAJES, RESULTS } from 'src/app/Constantes';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

// tslint:disable: radix

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private service: AppService) { }

  ngOnInit() {
    this.form = this.fb.group({
      sku: ['', Validators.required],
      nombre: ['', Validators.required],
      miga: ['', Validators.required],
      precio: [0, Validators.required],
      iva: [0, Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (this.form && this.form.get(field) && !this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        this.form.value.precio = parseInt(this.form.value.precio);
        this.form.value.iva = parseInt(this.form.value.iva);

        const res = await this.service.createProduct(this.form.value);
        if (res) {
          if (res.resultCode === RESULTS.OK) {
            this.form.get('sku').setValue('');
            this.form.get('nombre').setValue('');
            this.form.get('miga').setValue('');
            this.form.get('iva').setValue(0);
            this.form.get('precio').setValue(0);

            this.authService.mostrarMensaje('Producto creado con exito', MENSAJES.SUSSES);
          } else if (res.resultCode === RESULTS.REPITED) {
            this.authService.mostrarMensaje('Ya existe un producto con este SKU', MENSAJES.ERROR);
          } else {
            this.authService.mostrarMensaje('Respuesta invalida del servidor', MENSAJES.ERROR);
          }
        }
      } catch (e) {
        this.authService.mostrarMensaje('Respuesta invalida del servidor', MENSAJES.ERROR);
      }
    }
    this.formSubmitAttempt = true;
  }

}
