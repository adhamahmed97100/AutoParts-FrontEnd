import { Component, HostListener, inject, OnInit } from '@angular/core';

import { CommonModule, NgIf } from '@angular/common';
import { SaleAndRevenueComponent } from './Components/sale-and-revenue/sale-and-revenue.component';
import { OrdersComponent } from './Components/orders/orders.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, OrdersComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit() {
    this.isCollapsed = window.innerWidth <= 768;
  }
}
