import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountDetails } from '../models/account';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  // 1. Inject HttpClient efficiently
  private http = inject(HttpClient);

  // 2. Define the API URL using the environment variable
  // This matches your @RequestMapping("/accounts") in Spring Boot
  private apiServerUrl = environment.backendHost + "/accounts";

  constructor() { }

  // 3. Get the list of accounts
  // Returns an Observable of the Base Interface (AccountDetails[])
  public getAccounts(): Observable<AccountDetails[]> {
    return this.http.get<AccountDetails[]>(this.apiServerUrl);
  }
}
