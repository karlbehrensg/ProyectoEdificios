import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Global } from './global'
import { Shipment } from '../models/shipment';

@Injectable({
  providedIn: 'root'
})
export class ShipmentService {

  public url: String;

  constructor(
    private _http: HttpClient
  ){
    this.url = Global.uri
  }

  createShipment(ship: Shipment):Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.post(this.url + '/createshipment', ship, { headers: new HttpHeaders({'Authorization': token})})
  }

  getShipments():Observable<any>{
    const token = localStorage.getItem('token');
    return this._http.get(this.url + '/getShipmentsBuild', { headers: new HttpHeaders({'Authorization': token})})
  }
}