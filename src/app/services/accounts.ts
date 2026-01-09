import {HttpClient, HttpParams} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from '../models/account';
import { environment } from '../../environments/environment';
import {CustomerModel} from '../models/customer';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  // 1. Inject HttpClient efficiently
  private http = inject(HttpClient);

  // 2. Define the API URL using the environment variable
  // This matches your @RequestMapping("/accounts") in Spring Boot
  private apiServerUrl = environment.backendHost;

  constructor() { }

  // 3. Get the list of accounts
  // Returns an Observable of the Base Interface (AccountDetails[])
  public getAccounts(): Observable<AccountDetails[]> {

    return this.http.get<AccountDetails[]>(`${this.apiServerUrl}/accounts`);
  }
  // public saveCurrentAccount(balance: number, overDraft: number, customerId: number): Observable<any> {
  //   // We use HttpParams because the backend uses @RequestParam
  //   let params = new HttpParams()
  //     .set('initialBalance', balance)
  //     .set('overDraft', overDraft)
  //     .set('customerId', customerId);
  //
  //   return this.http.post(`${this.apiServerUrl}/accounts/current`, null, { params });
  // }
  //
  // // 2. Save Saving Account
  // public saveSavingAccount(balance: number, interestRate: number, customerId: number): Observable<any> {
  //   let params = new HttpParams()
  //     .set('initialBalance', balance)
  //     .set('interestRate', interestRate)
  //     .set('customerId', customerId);
  //
  //   return this.http.post(`${this.apiServerUrl}/accounts/saving`, null, { params });
  // }
  public saveCurrentAccount(initialBalance: number, overDraft: number, customerId: number): Observable<any> {
    // 1. Create the Object (DTO) matches your Backend CurrentAccountRequestDTO
    let data = {
      initialBalance: initialBalance,
      overDraft: overDraft,
      customerId: customerId
    };

    // 2. Send it as the BODY (no HttpParams)
    return this.http.post(`${this.apiServerUrl}/accounts/current`, data);
  }

  public saveSavingAccount(initialBalance: number, interestRate: number, customerId: number): Observable<any> {
    let data = {
      initialBalance: initialBalance,
      interestRate: interestRate,
      customerId: customerId
    };

    return this.http.post(`${this.apiServerUrl}/accounts/saving`, data);
  }

}
