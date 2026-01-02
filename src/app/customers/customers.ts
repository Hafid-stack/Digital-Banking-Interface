import {Component, OnInit} from '@angular/core';
import { Observable, catchError, of } from 'rxjs';

import {NgIf, NgFor, CommonModule} from '@angular/common';
import {CustomerService} from '../services/customer';
@Component({
  selector: 'app-customers',
  imports: [
    NgIf,NgFor,CommonModule
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  standalone: true
})

//@Injectable({ providedIn: 'root' })
export class Customers implements OnInit {
  //private apiUrl = 'http://localhost:8080/api/users';
  customers$! : Observable<any>;
  errorMessage!: string;
  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    // This runs automatically when page loads
//do not subscribe here
    // this.customerService.getCustomers().subscribe({
    //   next: (data) => {
    this.customers$ = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return of([]);
      })
    );
  }
}
// this is the old version
// ngOnInit() {
//     this.http.get("http://localhost:8085/customers").subscribe({
//       next: (data: any) => { // Changed Object to any for Angular's typical response type
//         this.customers = data;
//       },
//       error: (err) => {
//         console.error('Error fetching customers:', err); // Use console.error for errors
//       }
//     });
// }
// }
