import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {NgIf} from '@angular/common';
@Component({
  selector: 'app-customers',
  imports: [
    NgIf
  ],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
  standalone: true
})

//@Injectable({ providedIn: 'root' })
export class Customers implements OnInit {
  //private apiUrl = 'http://localhost:8080/api/users';
  customers : any;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("http://localhost:8085/customers").subscribe(data=>{
      this.customers=data;
    },error => {console.log(error);})
  }

}
