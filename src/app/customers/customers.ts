import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RouterLink} from '@angular/router';

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
  customers : any[] = [];
  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    // This runs automatically when page loads
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.customers = data; // Save the data
        //console.log(data);     // Check console to see if it worked
      },
      error: (err) => {
        console.error("Error getting customers.", err);
      }
    });
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
