import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Global } from './global'
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url: String;

  constructor(
    private _http: HttpClient
  ){
    this.url = Global.uri
  }

  login(user: Usuario):Observable<any>{
    return this._http.post(this.url + '/login', user)
  }

  logout():Observable<any>{
    const token = localStorage.getItem('token')
    const session = localStorage.getItem('sesion')
    return this._http.post(this.url + '/logout', { user: session },  { headers: new HttpHeaders({'Authorization': token})})
  }

}