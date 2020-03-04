import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Global } from './global'
import { Person } from '../models/person';
import { PersonVisit } from '../models/personvisit'

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  public url: String;

  constructor(
    private _http: HttpClient
  ){
    this.url = Global.uri
  }

  createPersonDep(person: Person):Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.post(this.url + '/createPersonDep', person, { headers: new HttpHeaders({'Authorization': token})})
  }

  createPersonVisit(person: PersonVisit):Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.post(this.url + '/createPersonVisit', person, { headers: new HttpHeaders({'Authorization': token})})
  }

  getPersons(): Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.post(this.url + '/getPerponsBuild', { data : '' }, { headers: new HttpHeaders({'Authorization': token})})
  }

}