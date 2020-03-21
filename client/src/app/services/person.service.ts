import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Global } from './global'
import { Person } from '../models/person';
import { PersonVisit } from '../models/personvisit'
import { CommentPerson } from '../models/commentPerson';

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

  createCommentPerson(data: CommentPerson): Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.post(this.url + '/createCommentPerson', data, { headers: new HttpHeaders({'Authorization': token})})
  }

  getCommentPerson(data: String): Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.post(this.url + '/getCommentPerson', { person: data }, { headers: new HttpHeaders({'Authorization': token})})
  }

  inactiveComment(data: String, state: Boolean): Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.post(this.url + '/inactiveComment', { comment: data, state: state }, { headers: new HttpHeaders({'Authorization': token})})
  }
}