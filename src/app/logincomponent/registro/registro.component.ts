import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RESULTS, MENSAJES } from 'src/app/Constantes';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private loginservice: LoginService
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      user: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  async onSubmit() {
    if (this.form.valid) {
      try {
        if (this.form.valid) {
          const res = await this.loginservice.CreateUser(this.form.value);
          if (res) {
            if (res.resultCode === RESULTS.OK) {
              this.form.value.usuario = this.form.value.user;
              this.form.value.currentPassword = this.form.value.password;
              this.authService.usuario = this.form.value;
              this.authService.loggedIn.next(true);
              this.router.navigate(['/home']);
            } else if (res.resultCode === RESULTS.REPITED) {
              this.authService.mostrarMensaje('Ya existe un usuario con este correo', MENSAJES.ERROR);
            } else {
              this.authService.mostrarMensaje('Respuesta invalida del servidor', MENSAJES.ERROR);
            }
          }
        }
      } catch (e) {
        this.authService.mostrarMensaje('Respuesta invalida del servidor', MENSAJES.ERROR);
      }
    }
    this.formSubmitAttempt = true;
  }

}
