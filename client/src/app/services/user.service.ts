import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Global } from './global'
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public url: String;

  constructor(
    private _http: HttpClient
  ){
    this.url = Global.uri
  }

  createUserAdmin(user: User):Observable<any>{
    const token = localStorage.getItem('token')
    return this._http.post(this.url + '/createUser', user,  { headers: new HttpHeaders({'Authorization': token})})
  }

  createUserBuild(user: User):Observable<any>{
    const token = localStorage.getItem('token')
    return this._http.post(this.url + '/createUserBuild', user,  { headers: new HttpHeaders({'Authorization': token})})
  }

}