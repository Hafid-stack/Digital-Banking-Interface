import {Component, inject, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AccountsService} from '../services/accounts';
import {catchError, Observable, of} from 'rxjs';
import {AccountDetails} from '../models/account';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.css']
})
export class Accounts implements OnInit {
  // 1. Inject the Service
  private accountService = inject(AccountsService);

  // 2. Data Stream (The Observable)
  // We use the '$' suffix to indicate this is a stream of data
  accounts$!: Observable<AccountDetails[]>;

  // 3. Error State (To show a message if backend fails)
  errorMessage!: string;
  ngOnInit(): void {
    // 4. Initialize the stream
    this.accounts$ = this.accountService.getAccounts().pipe(

      // SAFETY NET: If the backend fails, this runs.
      catchError(err => {
        this.errorMessage = err.message;
        // Return empty list so the app doesn't crash
        return of([]);
      })
    );
  }

}
