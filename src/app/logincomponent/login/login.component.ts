import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { MENSAJES, RESULTS } from 'src/app/Constantes';
import { LoginService } from '../../logincomponent/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  finalizando: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private loginservice: LoginService) { }

  ngOnInit() {
    this.form = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });

    if (localStorage.getItem('finalizando')) {
      this.finalizando = true;
    } else {
      this.finalizando = false;
    }
  }

  isFieldInvalid(field: string) {
    return (
      (this.form && this.form.get(field) && !this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  async onSubmit() {
    this.authService.logout();
    if (this.form.valid) {
      try {
        if (this.form.value.user !== '' && this.form.value.password !== '') {
          const res = await this.loginservice.GetUser(this.form.value);
          if (res) {
            if (res.resultCode === RESULTS.OK) {
              res.data.usuario = this.form.value.user;
              res.data.currentPassword = this.form.value.password;
              this.authService.usuario = res.data;
              this.authService.loggedIn.next(true);
              if (this.finalizando) {
                localStorage.setItem('finalizando', '1');
                this.router.navigate(['/compras']);
              } else {
                this.router.navigate(['/home']);
              }
            } else if (res.resultCode === RESULTS.PASSWORDINVALID) {
              this.authService.mostrarMensaje('Constraseña invalida', MENSAJES.ERROR);
            } else if (res.resultCode === RESULTS.USERINVALID) {
              this.authService.mostrarMensaje('El usuario no existe', MENSAJES.ERROR);
            } else if (res.resultCode === RESULTS.CHANGEPASSWORD) {
              res.data.nuevo = true;
              res.data.usuario = this.form.value.user;
              this.authService.usuario = res.data;
              this.authService.mostrarMensaje('Debe cambiar su clave', MENSAJES.ERROR);
              this.router.navigate(['/setearclave']);
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
