import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Global } from './global'
import { User } from '../models/user';
import { StateUser } from '../models/stateUser';

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

  getListUsersBuild():Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.get(this.url + '/getUsersBuild', { headers: new HttpHeaders({'Authorization': token})})
  }

  setStateUser(user: StateUser):Observable<any>{
    const token = localStorage.getItem('token')
    return this._http.post(this.url + '/setStateUser', user,  { headers: new HttpHeaders({'Authorization': token})})
  }

}