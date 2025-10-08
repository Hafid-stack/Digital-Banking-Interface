import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {NgIf, NgFor} from '@angular/common';
@Component({
  selector: 'app-customers',
  imports: [
    NgIf,NgFor
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  standalone: true
})

//@Injectable({ providedIn: 'root' })
export class Customers implements OnInit {
  //private apiUrl = 'http://localhost:8080/api/users';
  customers : any[] = [];
  constructor(private http: HttpClient) {}


ngOnInit() {
    this.http.get("http://localhost:8085/customers").subscribe({
      next: (data: any) => { // Changed Object to any for Angular's typical response type
        this.customers = data;
      },
      error: (err) => {
        console.error('Error fetching customers:', err); // Use console.error for errors
      }
    });
}
}
