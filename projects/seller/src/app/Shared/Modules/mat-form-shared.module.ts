import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

const Modules = [
  MatFormFieldModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatIconModule,
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [],
  imports: [Modules],
  exports: [...Modules],
})
export class MatFormSharedModule {}
