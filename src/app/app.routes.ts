// import { Routes } from '@angular/router';
// import { Customers } from './customers/customers';
// import { Accounts } from './accounts/accounts';
//
// export const routes: Routes = [
//   //this is just a temporary fix i will add a home page in the future
//   { path: '', redirectTo: 'customers', pathMatch: 'full' },
//   { path: "customers", component: Customers },
//   { path: "accounts", component: Accounts},
// ];
import { Routes} from '@angular/router';
import { Customers } from './customers/customers';
import { Accounts } from './accounts/accounts';
// import {NavBar} from './nav-bar/nav-bar';

export const routes: Routes = [
  { path: '', redirectTo: 'customers', pathMatch: 'full' },
  { path: 'customers', component: Customers},
  { path: 'accounts', component: Accounts },
];
//
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
