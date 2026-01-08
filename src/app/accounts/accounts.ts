import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; // 1. Add ReactiveFormsModule
import { AccountsService } from '../services/accounts';
import { CustomerService } from '../services/customer'; // You need this for the dropdown
import { catchError, Observable, of } from 'rxjs';
import { AccountDetails } from '../models/account';
import { CustomerModel } from '../models/customer';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // 2. Register it here
  templateUrl: './accounts.html',
  styleUrls: ['./accounts.css']
})
export class Accounts implements OnInit {
  accountService = inject(AccountsService);
  customerService = inject(CustomerService); // Inject Customer Service
  fb = inject(FormBuilder);

  accounts$!: Observable<AccountDetails[]>;
  customers$!: Observable<CustomerModel[]>; // Stream for the dropdown
  errorMessage!: string;

  // 3. The Form
  accountForm!: FormGroup;

  ngOnInit(): void {
    // Load the list of accounts
    this.refreshAccounts();

    // Load the list of customers for the dropdown
    this.customers$ = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = "Could not load customers";
        return of([]);
      })
    );

    // 4. Initialize the Form
    this.accountForm = this.fb.group({
      customerId: [null, Validators.required],
      balance: [0, [Validators.required, Validators.min(100)]],
      type: ['CurrentAccount', Validators.required],
      overDraft: [0],     // For Current
      interestRate: [0]   // For Saving
    });
  }

  // Helper to reload the table
  refreshAccounts() {
    this.accounts$ = this.accountService.getAccounts().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return of([]);
      })
    );
  }

  // 5. Handle the Save Button
  handleSaveAccount() {
    if (this.accountForm.invalid) return;

    let formValue = this.accountForm.value;

    if (formValue.type === 'CurrentAccount') {
      this.accountService.saveCurrentAccount(
        formValue.balance,
        formValue.overDraft,
        formValue.customerId
      ).subscribe({
        next: (data) => {
          alert("Current Account Saved!");
          this.refreshAccounts(); // Reload the table
          this.accountForm.reset({ type: 'CurrentAccount', balance: 0 }); // Reset form
        },
        error: (err) => alert("Error saving account: " + err.message)
      });
    } else {
      this.accountService.saveSavingAccount(
        formValue.balance,
        formValue.interestRate,
        formValue.customerId
      ).subscribe({
        next: (data) => {
          alert("Saving Account Saved!");
          this.refreshAccounts();
          this.accountForm.reset({ type: 'SavingAccount', balance: 0 });
        },
        error: (err) => alert("Error saving account: " + err.message)
      });
    }
  }
}
