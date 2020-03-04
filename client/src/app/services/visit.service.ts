import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Global } from './global'
import { Visit } from '../models/visit';

@Injectable({
  providedIn: 'root'
})
export class VisitService {

  public url: String;

  constructor(
    private _http: HttpClient
  ){
    this.url = Global.uri
  }

  createVisit(visit: Visit):Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.post(this.url + '/createVisit', visit, { headers: new HttpHeaders({'Authorization': token})})
  }

  getListVisit():Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.get(this.url + '/getVisitBuild', { headers: new HttpHeaders({'Authorization': token})})
  }

}