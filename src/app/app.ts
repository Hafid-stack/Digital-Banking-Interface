import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBar} from './nav-bar/nav-bar';
import { Customers } from './customers/customers';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar,Customers],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Digital_Banking_TP4_FrontEnd_Angular');
}
