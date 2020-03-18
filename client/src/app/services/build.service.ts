import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Global } from './global'
import { Build } from '../models/build';

@Injectable({
  providedIn: 'root'
})
export class BuildService {

  public url: String;

  constructor(
    private _http: HttpClient
  ){
    this.url = Global.uri
  }

  createBuild(buid: Build):Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.post(this.url + '/createBuild', buid, { headers: new HttpHeaders({'Authorization': token})})
  }

  builds():Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.get(this.url + '/buildings', { headers: new HttpHeaders({'Authorization': token})})
  }

}