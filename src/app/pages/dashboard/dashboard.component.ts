import { Component } from '@angular/core';
import { ProductsTableComponent } from './products-table/products-table.component';
import { UsersTableComponent } from './users-table/users-table.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ProductsTableComponent, UsersTableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {}
