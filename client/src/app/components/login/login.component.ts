import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackConfirmationComponent } from '../snack-confirmation/snack-confirmation.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  public login: any;
  public loading: Boolean;
  public durationInSeconds = 5;

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.login = {
      email: '',
      password: ''
    }
    this.loading = false
  }

  signIn($event) {
    this.loading = true
    this._loginService.login(this.login).subscribe(
      response => {
        if(response.hash) {
          localStorage.setItem('token', response.hash)
          localStorage.setItem('role', response.role)
          localStorage.setItem('sesion', response.sesion)
          this.loading = false
        }

        if(response.role) {

          switch (response.role) {
            case "BUILD":
              // user
              this._router.navigate(["/registrarVisita"]);
              break;
            case "ADMIN":
              // administrador
              this._router.navigate(["registrarPersona"]);
              break;
            case "SUPERADMIN":
              // super administrador
              this._router.navigate(["crearEdificios"]);
              break;
          }
        }
      },
      error => {
        this.loading = false
        if(error.status == 500 && error.error.msg != null) {
          this._snackBar.open(error.error.msg, 'OK', {
            duration: this.durationInSeconds * 1000,
          });
        }
      }
    );
  }

  ngOnInit() {

  }

  openSnackBar(mesagge: any) {
    this._snackBar.openFromComponent(SnackConfirmationComponent, {
      duration: this.durationInSeconds * 1000,
      data: mesagge
    });
  }

}
