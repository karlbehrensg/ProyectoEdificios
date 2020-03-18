import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    public router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(localStorage.getItem('token') != null ) {
      const role = localStorage.getItem('role')
      
      switch (role) {
        case "USER":
          this.router.navigate(["/registrarVisita"]);
          break;
        case "ADMIN":
          this.router.navigate(["registrarPersona"]);
          break;
        case "SUPERADMIN":
          this.router.navigate(["crearEdificios"]);
          break;
      }
    }

    return true;
  }
  
}
