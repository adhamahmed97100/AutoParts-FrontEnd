import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-update-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <h2 mat-dialog-title>
          <i class="fa-solid fa-triangle-exclamation warning-icon"></i>
          Product Update Confirmation
        </h2>
      </div>
      <mat-dialog-content>
        <div class="message-container">
          <p class="greeting">Dear Store Owner, Abanoub</p>
          <p class="intro">We hope you're doing well.</p>
          <p class="main-message">
            As part of our quality and consistency efforts, we kindly ask you to
            confirm whether your product listings have been updated this week.
          </p>
          <div class="question-box">
            <p class="question">Have your products been updated this week?</p>
            <p class="options-title">Please choose one of the options below:</p>
            <div class="options">
              <div class="option">
                <i class="fa-solid fa-circle-check"></i>
                <span>YES – My products have been updated</span>
              </div>
              <div class="option">
                <i class="fa-solid fa-circle-xmark"></i>
                <span>NO – I haven't updated them yet</span>
              </div>
            </div>
          </div>
          <div class="warning-box">
            <p class="warning">
              <i class="fa-solid fa-exclamation-triangle"></i>
              If your products are not yet updated, you have 24 hours to
              complete the updates and return to this email to confirm with
              "Yes."
            </p>
            <p class="warning">
              <i class="fa-solid fa-exclamation-triangle"></i>
              Failure to confirm within 24 hours or selecting "No" without
              follow-up will result in an official warning.
            </p>
          </div>
          <p class="closing">
            Thank you for your cooperation and commitment to maintaining a
            high-quality platform.
          </p>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button class="no-btn" (click)="onNoClick()">
          <i class="fa-solid fa-times"></i>
          NO
        </button>
        <button mat-raised-button class="yes-btn" (click)="onYesClick()">
          <i class="fa-solid fa-check"></i>
          YES
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      ::ng-deep .mat-mdc-dialog-surface {
        border-radius: 50px !important;
      }
      .dialog-container {
        padding: 0;

        overflow: hidden;
      }

      .dialog-header {
        background: #f8f9fa;
        padding: 20px;
        border-bottom: 1px solid #eee;
      }

      .dialog-header h2 {
        margin: 0;
        color: #213a59;
        font-size: 1.5rem;
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .warning-icon {
        color: #dc3545;
      }

      mat-dialog-content {
        padding: 24px;
        max-height: 70vh;
        overflow-y: auto;
      }

      .message-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .greeting {
        font-size: 1.2rem;
        font-weight: 600;
        color: #213a59;
        margin: 0;
      }

      .intro {
        color: #6c757d;
        margin: 0;
      }

      .main-message {
        color: #495057;
        line-height: 1.6;
        margin: 0;
      }

      .question-box {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 12px;
        margin: 10px 0;
      }

      .question {
        font-weight: 600;
        color: #213a59;
        margin: 0 0 10px 0;
      }

      .options-title {
        color: #6c757d;
        margin: 0 0 15px 0;
      }

      .options {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px;
        border-radius: 8px;
        background: white;
        transition: all 0.3s ease;
      }

      .option:hover {
        background: #e9ecef;
      }

      .option i {
        font-size: 1.2rem;
      }

      .option i.fa-circle-check {
        color: #28a745;
      }

      .option i.fa-circle-xmark {
        color: #dc3545;
      }

      .warning-box {
        background: #fff3cd;
        border: 1px solid #ffeeba;
        border-radius: 12px;
        padding: 15px;
        margin: 10px 0;
      }

      .warning {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        color: #856404;
        margin: 0 0 10px 0;
        line-height: 1.5;
      }

      .warning:last-child {
        margin-bottom: 0;
      }

      .warning i {
        margin-top: 3px;
      }

      .closing {
        color: #495057;
        margin: 0;
      }

      mat-dialog-actions {
        padding: 16px 24px;
        margin: 0;
        border-top: 1px solid #eee;
      }

      .no-btn {
        color: #dc3545;
      }

      .yes-btn {
        background: #28a745;
        color: white;
      }

      .no-btn:hover {
        background: rgba(220, 53, 69, 0.1);
      }

      .yes-btn:hover {
        background: #218838;
      }

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 20px;
        font-weight: 500;
      }

      /* Custom scrollbar */
      mat-dialog-content::-webkit-scrollbar {
        width: 6px;
      }

      mat-dialog-content::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 10px;
      }

      mat-dialog-content::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 10px;
      }

      mat-dialog-content::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }
    `,
  ],
})
export class ProductUpdateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ProductUpdateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close('no');
  }

  onYesClick(): void {
    this.dialogRef.close('yes');
  }
}
