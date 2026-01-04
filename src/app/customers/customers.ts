import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, catchError, of, tap } from 'rxjs';

import {CustomerService} from '../services/customer';
import {CustomerModel} from '../models/customer';



@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrls: ['./customers.css']
})
export class Customers implements OnInit {


  customers$!: Observable<CustomerModel[]>;
  // customers$!: Observable<any>;


  errorMessage: string = '';

  constructor(private customerService: CustomerService) {}

  // ngOnInit(): void {
  //   this.customers$ = this.customerService.getCustomers().pipe(
  //     tap(data => console.log('📦 CUSTOMERS FROM API:', data)),
  //     catchError(err => {
  //       this.errorMessage = 'Failed to load customers';
  //       console.error(err);
  //       return of([]);
  //     })
  //   );
  // ngOnInit(): void {
  //   this.customerService.getCustomers().subscribe(data => {
  //     console.log('✅ FINAL DATA USED BY TABLE:', data);
  //   });
  // }
  ngOnInit() {
    // We get the stream from the service
    this.customers$ = this.customerService.getCustomers().pipe(

      // Spy: Print the data to console so we can see it
      tap(data => console.log('✅ Data arrived:', data)),

      // Error Handler: If backend is dead, return empty list
      catchError(err => {
        console.error('❌ Error:', err);
        this.errorMessage = err.message;
        return of([]);
      })
    );
  }


}
