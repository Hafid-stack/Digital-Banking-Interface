import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, catchError, of, tap } from 'rxjs';

import { CustomerService } from '../services/customer';
import { CustomerModel } from '../models/customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  // We added ReactiveFormsModule here so the "Add" form works
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class Customers implements OnInit {

  // This is your existing Observable logic
  customers$!: Observable<CustomerModel[]>;
  errorMessage: string = '';

  // This handles the "Add Customer" form
  newCustomerForm!: FormGroup;

  constructor(
    private customerService: CustomerService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // 1. Setup the form for adding a customer
    this.newCustomerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    // 2. Load the initial list of customers
    this.loadCustomers();
  }

  //Get ALL Customers
  loadCustomers() {
    this.customers$ = this.customerService.getCustomers().pipe(
      tap(data => console.log('✅ Data arrived:', data)),
      catchError(err => {
        console.error('❌ Error:', err);
        this.errorMessage = err.message;
        return of([]);
      })
    );
  }

  // --- DELETE ACTION ---
  handleDeleteCustomer(c: CustomerModel) {
    if(confirm("Are you sure you want to delete " + c.name + "?")) {
      this.customerService.deleteCustomer(c.id).subscribe({
        next: () => {
          // Refresh the list after deleting
          this.loadCustomers();
        },
        error: (err) => {
          alert("Failed to delete.");
          console.log(err);
        }
      });
    }
  }

  // --- ADD (POST) ACTION ---
  handleSaveCustomer() {
    if (this.newCustomerForm.valid) {
      let customer: CustomerModel = this.newCustomerForm.value;

      this.customerService.saveCustomer(customer).subscribe({
        next: (data) => {
          alert("Customer Saved!");
          this.newCustomerForm.reset(); // Clear the form
          this.loadCustomers();         // Refresh the list
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Observable, catchError, of, tap } from 'rxjs';
//
// import {CustomerService} from '../services/customer';
// import {CustomerModel} from '../models/customer';
//
//
//
// @Component({
//   selector: 'app-customers',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './customers.html',
//   styleUrls: ['./customers.css']
// })
// export class Customers implements OnInit {
//
//
//   customers$!: Observable<CustomerModel[]>;
//   // customers$!: Observable<any>;
//
//
//   errorMessage: string = '';
//
//   constructor(private customerService: CustomerService) {}
//
//   // ngOnInit(): void {
//   //   this.customers$ = this.customerService.getCustomers().pipe(
//   //     tap(data => console.log('📦 CUSTOMERS FROM API:', data)),
//   //     catchError(err => {
//   //       this.errorMessage = 'Failed to load customers';
//   //       console.error(err);
//   //       return of([]);
//   //     })
//   //   );
//   // ngOnInit(): void {
//   //   this.customerService.getCustomers().subscribe(data => {
//   //     console.log('✅ FINAL DATA USED BY TABLE:', data);
//   //   });
//   // }
//   ngOnInit() {
//     // We get the stream from the service
//     this.customers$ = this.customerService.getCustomers().pipe(
//
//       // Spy: Print the data to console so we can see it
//       tap(data => console.log('✅ Data arrived:', data)),
//
//       // Error Handler: If backend is dead, return empty list
//       catchError(err => {
//         console.error('❌ Error:', err);
//         this.errorMessage = err.message;
//         return of([]);
//       })
//     );
//   }
//
//
// }
