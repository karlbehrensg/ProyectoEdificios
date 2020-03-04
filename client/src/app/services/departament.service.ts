import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Global } from './global'
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class DepartamentService {

  public url: String;

  constructor(
    private _http: HttpClient
  ){
    this.url = Global.uri
  }

  departaments():Observable<any>{
    const token = localStorage.getItem('token');

    return this._http.post(this.url + '/departaments', { data : '' }, { headers: new HttpHeaders({'Authorization': token})})
  }

}