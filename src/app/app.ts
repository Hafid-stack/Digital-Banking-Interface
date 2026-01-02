import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBar} from './nav-bar/nav-bar';
// import {NavBar} from './nav-bar/nav-bar';
// import {Accounts} from './accounts/accounts';
// import {Customers} from './customers/customers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NavBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Digital_Banking_TP4_FrontEnd_Angular');
}
