import { Component } from '@angular/core';
import { CarPartsSelectorComponent } from '../../../home/car-parts-selector/car-parts-selector.component';

@Component({
  selector: 'app-category',
  imports: [CarPartsSelectorComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {}
