import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cancel-order-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Cancel Order</h2>
    <mat-dialog-content>
      <p>Please provide a reason for cancelling this order:</p>
      <mat-form-field appearance="outline" class="w-100">
        <mat-label>Cancellation Reason</mat-label>
        <textarea
          matInput
          [(ngModel)]="cancellationReason"
          rows="3"
          required
        ></textarea>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button
        mat-raised-button
        color="warn"
        (click)="onConfirm()"
        [disabled]="!cancellationReason"
      >
        Confirm Cancellation
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      ::ng-deep .mat-mdc-dialog-container {
        border-radius: 50px !important;
      }

      ::ng-deep .mat-mdc-dialog-surface {
        border-radius: 50px !important;
      }

      mat-form-field {
        width: 100%;
      }

      mat-dialog-content {
        padding: 20px;
        text-align: center;
      }

      mat-dialog-actions {
        padding: 20px;
      }

      button {
        margin: 0 8px;
      }

      textarea {
        min-height: 100px;
      }
    `,
  ],
})
export class CancelOrderDialogComponent {
  cancellationReason: string = '';

  constructor(
    public dialogRef: MatDialogRef<CancelOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onConfirm(): void {
    this.dialogRef.close(this.cancellationReason);
  }
}
