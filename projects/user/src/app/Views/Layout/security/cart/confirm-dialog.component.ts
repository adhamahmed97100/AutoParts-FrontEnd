import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatIconModule],
  template: `
    <div class="dialog-container">
      <div class="icon-container">
        <mat-icon class="warning-icon">warning</mat-icon>
      </div>
      <h2 mat-dialog-title>Confirm Delete</h2>
      <mat-dialog-content>
        <p>Are you sure you want to delete</p>
        <strong>{{ data.productName }}</strong>
        <p>from your cart?</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onNoClick()" class="cancel-btn">
          <mat-icon>close</mat-icon>
          Cancel
        </button>
        <button
          mat-raised-button
          color="warn"
          (click)="onYesClick()"
          class="delete-btn"
        >
          <mat-icon>delete</mat-icon>
          Delete
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 20px;
        text-align: center;
      }

      .warning-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #f44336;
      }

      mat-dialog-title {
        margin: 0;
        font-size: 24px;
        font-weight: 500;
        color: #333;
      }

      mat-dialog-content {
        margin: 20px 0;
        color: #666;
        font-size: 16px;
        line-height: 1.5;
      }

      mat-dialog-content p {
        margin: 0;
      }

      mat-dialog-content strong {
        color: #333;
      }

      mat-dialog-actions {
        padding: 16px 0 0 0;
        margin: 0;
        gap: 8px;
      }

      .cancel-btn,
      .delete-btn {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 0 16px;
        min-width: 100px;
      }

      .cancel-btn mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .delete-btn mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productName: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
