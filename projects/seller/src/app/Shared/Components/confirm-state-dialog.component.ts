import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-state-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>Confirm Status Change</h2>
    <mat-dialog-content>
      <p>
        Are you sure you want to change the order status to
        <strong>{{ data.newStatus }}</strong
        >?
      </p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button
        mat-raised-button
        class="accept-button"
        style="background-color: #002a47; color: white"
        (click)="onConfirm()"
      >
        Confirm
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      ::ng-deep .mat-mdc-dialog-container {
        border-radius: 30px !important;
      }
      .accept-button mat-button {
        background-color: #002a47;
        color: white;
      }

      .accept-button:hover {
        background-color: #04395e !important;
      }

      ::ng-deep .mat-mdc-dialog-surface {
        border-radius: 30px !important;
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
    `,
  ],
})
export class ConfirmStateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmStateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { newStatus: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
