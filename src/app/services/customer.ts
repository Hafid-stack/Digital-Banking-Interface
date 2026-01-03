import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {CustomerModel} from '../models/customer';



@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8085/customers';

  constructor(private http: HttpClient) {}

  // getCustomers(): Observable<CustomerModel[]> {
  //   return this.http.get<any>(this.apiUrl).pipe(
  //     map(res => res._embedded.customers)
  //   );
  // }
  public getCustomers(): Observable<any> {
    // Just get the data and pass it through. No mapping needed!
    return this.http.get<any>(this.apiUrl);
  }

}
