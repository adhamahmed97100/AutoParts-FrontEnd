import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormSharedModule } from '../../../../../Shared/Modules/mat-form-shared.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [MatDialogModule, MatFormSharedModule, CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css',
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: any;

  datadailog = inject(MAT_DIALOG_DATA);
  getStatusText(status: number): string {
    const statuses = [
      'Pending',
      'Confirm',
      'Shipped',
      'Delivered',
      'Cancelled',
    ];
    return statuses[status] ?? '';
  }

  getStatusClass(status: number): string {
    return (
      {
        0: 'status-pending',
        1: 'status-confirm',
        2: 'status-shipped',
        3: 'status-delivered',
        4: 'status-cancelled',
      }[status] || 'unknown-status'
    );
  }
  ngOnInit(): void {
    this.orderDetails = this.datadailog;
    console.log(this.orderDetails);
  }
}
