import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-confirm-agremnt',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './confirm-agremnt.component.html',
  styleUrl: './confirm-agremnt.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmAgremntComponent {}
