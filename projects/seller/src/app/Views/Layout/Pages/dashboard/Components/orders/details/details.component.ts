import { Component, Inject } from '@angular/core';
import { MatFormSharedModule } from '../../../../../../../Shared/Modules/mat-form-shared.module';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list'; // ✅ ضيف ده هنا
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details',
  imports: [MatFormSharedModule, MatDialogModule, MatListModule, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public order: any) {}

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
}
