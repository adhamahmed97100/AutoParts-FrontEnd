import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product-warning-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="dialog-container">
      <div
        class="dialog-header"
        [ngClass]="{ warning: type === 'warning', alert: type === 'alert' }"
      >
        <div class="header-content">
          <div
            class="icon-wrapper"
            [ngClass]="{ warning: type === 'warning', alert: type === 'alert' }"
          >
            <i class="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div class="title-section">
            <h2 mat-dialog-title>Product Update Warning</h2>
            <p class="subtitle">Action Required</p>
          </div>
        </div>
      </div>
      <mat-dialog-content>
        <div class="message-container">
          <div class="greeting-section">
            <p class="greeting">Dear Store Owner, Abanoub</p>
            <p class="intro">We hope you're doing well.</p>
          </div>

          <div class="main-message-section">
            <p class="main-message">
              We noticed that you did not confirm updating your products within
              the required 24-hour window, and no updates have been made to your
              store this week.
            </p>
            <div class="consequence-box">
              <i class="fa-solid fa-circle-exclamation"></i>
              <p class="consequence">
                As a result, all products listed under your store on our website
                have been automatically marked as "Out of Stock."
              </p>
            </div>
          </div>

          <div class="impact-section">
            <div class="section-header">
              <i class="fa-solid fa-list-check"></i>
              <h3>This means:</h3>
            </div>
            <ul class="impact-list">
              <li>
                <i class="fa-solid fa-arrow-right"></i>
                <span
                  >Your products will no longer appear in the top search
                  results.</span
                >
              </li>
              <li>
                <i class="fa-solid fa-arrow-right"></i>
                <span
                  >Your visibility on the platform will be significantly
                  reduced.</span
                >
              </li>
            </ul>
          </div>

          <div class="solution-section">
            <div class="section-header">
              <i class="fa-solid fa-lightbulb"></i>
              <h3>How to Fix This</h3>
            </div>
            <div class="solution-content">
              <p class="solution-text">
                To restore your products to active status and regain visibility,
                please update your listings as soon as possible. Once updated,
                your products will automatically return to their normal status.
              </p>
              <div class="warning-box">
                <i class="fa-solid fa-exclamation-triangle"></i>
                <p class="warning-text">
                  Maintaining up-to-date listings is essential to providing a
                  reliable experience for our customers. Please treat this as
                  your first official warning.
                </p>
              </div>
            </div>
          </div>

          <p class="closing">Thank you for your attention.</p>
        </div>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button class="close-btn" (click)="onClose()">
          <i class="fa-solid fa-times"></i>
          Close
        </button>
        <button mat-raised-button class="update-btn" (click)="onUpdate()">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          Update Stock
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      ::ng-deep .mat-mdc-dialog-container {
        border-radius: 50px !important;
      }

      ::ng-deep .mat-mdc-dialog-surface {
        border-radius: 50px !important;
      }

      .dialog-container {
        padding: 0;
        border-radius: 16px;
        overflow: hidden;
        background: white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      }

      .dialog-header {
        padding: 24px;
        position: relative;
        overflow: hidden;
      }

      .dialog-header.warning {
        background: linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%);
        border-bottom: 1px solid rgba(133, 100, 4, 0.1);
      }

      .dialog-header.alert {
        background: linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%);
        border-bottom: 1px solid rgba(220, 53, 69, 0.1);
      }

      .header-content {
        display: flex;
        align-items: center;
        gap: 16px;
        position: relative;
        z-index: 1;
      }

      .icon-wrapper {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
      }

      .icon-wrapper.warning {
        background: rgba(255, 193, 7, 0.1);
      }

      .icon-wrapper.warning i {
        color: #ffc107;
      }

      .icon-wrapper.alert {
        background: rgba(220, 53, 69, 0.1);
      }

      .icon-wrapper.alert i {
        color: #dc3545;
      }

      .title-section {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .dialog-header h2 {
        margin: 0;
        color: #856404;
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: -0.5px;
      }

      .subtitle {
        margin: 0;
        color: #856404;
        font-size: 0.9rem;
        opacity: 0.8;
      }

      mat-dialog-content {
        padding: 24px;
        max-height: 70vh;
        overflow-y: auto;
      }

      .message-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .greeting-section {
        border-bottom: 1px solid #eee;
        padding-bottom: 16px;
      }

      .greeting {
        font-size: 1.2rem;
        font-weight: 600;
        color: #213a59;
        margin: 0 0 8px 0;
      }

      .intro {
        color: #6c757d;
        margin: 0;
        font-size: 1rem;
      }

      .main-message-section {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .main-message {
        color: #495057;
        line-height: 1.6;
        margin: 0;
        font-size: 1rem;
      }

      .consequence-box {
        background: rgba(220, 53, 69, 0.05);
        border: 1px solid rgba(220, 53, 69, 0.1);
        border-radius: 12px;
        padding: 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
        box-shadow: 0 2px 8px rgba(220, 53, 69, 0.1);
      }

      .consequence-box i {
        color: #dc3545;
        font-size: 18px;
        margin-top: 2px;
      }

      .consequence {
        color: #dc3545;
        margin: 0;
        line-height: 1.5;
        font-weight: 500;
      }

      .section-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }

      .section-header i {
        color: #213a59;
        font-size: 18px;
      }

      .section-header h3 {
        margin: 0;
        color: #213a59;
        font-size: 1.1rem;
        font-weight: 600;
      }

      .impact-section {
        background: #f8f9fa;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
      }

      .impact-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .impact-list li {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        color: #495057;
        line-height: 1.5;
      }

      .impact-list li i {
        color: #213a59;
        font-size: 14px;
        margin-top: 4px;
      }

      .solution-section {
        background: #fff3cd;
        border: 1px solid #ffeeba;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(133, 100, 4, 0.1);
      }

      .solution-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .solution-text {
        color: #856404;
        margin: 0;
        line-height: 1.6;
      }

      .warning-box {
        background: rgba(133, 100, 4, 0.1);
        border-radius: 8px;
        padding: 16px;
        display: flex;
        align-items: flex-start;
        gap: 12px;
      }

      .warning-box i {
        color: #856404;
        font-size: 18px;
        margin-top: 2px;
      }

      .warning-text {
        color: #856404;
        margin: 0;
        line-height: 1.5;
        font-weight: 500;
      }

      .closing {
        color: #495057;
        margin: 0;
        text-align: center;
        font-style: italic;
      }

      mat-dialog-actions {
        padding: 16px 24px;
        margin: 0;
        border-top: 1px solid #eee;
        background: #f8f9fa;
      }

      .close-btn {
        color: #6c757d;
      }

      .update-btn {
        background: #28a745;
        color: white;
      }

      .close-btn:hover {
        background: rgba(108, 117, 125, 0.1);
      }

      .update-btn:hover {
        background: #218838;
      }

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 20px;
        font-weight: 500;
        border-radius: 8px;
        transition: all 0.2s ease;
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
export class ProductWarningDialogComponent {
  @Input() type: 'warning' | 'alert' = 'warning';

  constructor(
    public dialogRef: MatDialogRef<ProductWarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { productId: string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    this.dialogRef.close('update');
  }
}
