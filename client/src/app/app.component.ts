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
  token = localStorage.getItem('token');

  constructor(
    private _router: Router
  ) {}

  ngDoCheck() {
    if( this.token == null) {
      if(localStorage.getItem('token') != null) this.token = localStorage.getItem('token')
    }

  }

  async signOut(drawer) {
    if(drawer.opened) { await drawer.close() }
    localStorage.removeItem('token')
    this.token = null
    this._router.navigate([""]);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && 
      outlet.activatedRouteData && 
      outlet.activatedRouteData['animation'];
   }
}
