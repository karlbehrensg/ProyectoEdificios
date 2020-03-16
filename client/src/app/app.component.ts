import { Component, DoCheck } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { fader } from './animations/animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fader]
})
export class AppComponent implements DoCheck{
  public token = localStorage.getItem('token');
  public role = localStorage.getItem('role');

  constructor(
    private _router: Router
  ) {}

  ngDoCheck() {
    if( this.token == null) {
      const token = localStorage.getItem('token')
      if(token != null) this.token = token
    }

    if( this.role == null) {
      const role = localStorage.getItem('role')
      if(role != null) this.role = role
    }
  }

  async signOut(drawer) {
    if(drawer.opened) { await drawer.close() }
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.token = null
    this.role = null
    this._router.navigate([""]);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && 
      outlet.activatedRouteData && 
      outlet.activatedRouteData['animation'];
   }
}
