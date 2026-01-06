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
  private apiServerUrl = environment.backendHost ;
  constructor() { }
  public getCustomers(): Observable<CustomerModel[]>{
    //return this.http.get<CustomerModel[]>(this.apiServerUrl+"/customers"); traditional/old way
    return this.http.get<CustomerModel[]>(`${this.apiServerUrl}/customers`);//new
  }

//AI help
  public getCustomerById(id: number): Observable<CustomerModel> {
    // Note: Controller uses singular /customer/{id}
    return this.http.get<CustomerModel>(`${this.apiServerUrl}/customer/${id}`);
  }

  public saveCustomer(customer: CustomerModel): Observable<CustomerModel> {
    return this.http.post<CustomerModel>(`${this.apiServerUrl}/customers`, customer);
  }

  public updateCustomer(id: number, customer: CustomerModel): Observable<CustomerModel> {
    return this.http.put<CustomerModel>(`${this.apiServerUrl}/customers/${id}`, customer);
  }

  public deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/customers/${id}`);
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
