import {inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {environment} from '../../environments/environment';
import {CustomerModel} from '../models/customer';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private http=inject(HttpClient);
  private apiServerUrl = environment.backendHost + "/customers";
  constructor() { }
  public getCustomers(): Observable<CustomerModel[]>{
    return this.http.get<CustomerModel[]>(this.apiServerUrl);
  }





  // this is supposedly old according to chatgpt, it poses a security risk
  // private apiUrl = 'http://localhost:8085/customers';
  //
  // constructor(private http: HttpClient) {}
  //
  // public getCustomers(): Observable<any> {
  //
  //   return this.http.get<any>(this.apiUrl);
  // }
}
