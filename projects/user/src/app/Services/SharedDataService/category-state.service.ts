import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GetCategoryModel } from '../Category/Queries/Models/GetCategoryModel';

@Injectable({
  providedIn: 'root',
})
export class CategoryStateService {
  private categorySubject = new BehaviorSubject<GetCategoryModel | null>(null);
  category$ = this.categorySubject.asObservable();

  updateCategory(category: GetCategoryModel) {
    console.log('Updating category in service:', category);
    this.categorySubject.next(category);
  }

  getCurrentCategory(): GetCategoryModel | null {
    return this.categorySubject.value;
  }
}
