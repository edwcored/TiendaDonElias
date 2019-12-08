import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  logueado = false;
  admin = false;

  constructor(private autservice: AuthService) { }

  ngOnInit() {
    if (this.autservice.usuario) {
      this.logueado = true;
      if (this.autservice.usuario.role === 'admin') {
        this.admin = true;
      }
    }
    console.log(this.admin);
  }

}
