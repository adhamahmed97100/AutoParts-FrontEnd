import { ResolveFn } from '@angular/router';
import { CategoryDto } from '../Core/Dtos/CategoryDto';
import { inject } from '@angular/core';
import { CategoryQuereisService } from '../Services/Category/Queries/Handler/category-quereis.service';
import { map } from 'rxjs';
import { GetCategoryModel } from '../Services/Category/Queries/Models/GetCategoryModel';

export const categoryResolver: ResolveFn<CategoryDto> = (route, state) => {
  const CategoryService = inject(CategoryQuereisService);
  return CategoryService.GetCategoryById(
    route.params['id'] ?? route.params['CategoryId']
  ).pipe(
    map((res) => {
      return res.data;
    })
  );
};
