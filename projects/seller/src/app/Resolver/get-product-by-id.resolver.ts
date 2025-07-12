import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';

import { map } from 'rxjs';

import { ProductQuereisService } from '../Services/Product/Queries/Handler/product-quereis.service';
import { GetSellerProductByidModel } from '../Services/Product/Queries/Models/GetSellerProductByidModel';

export const getProductByIdResolver: ResolveFn<GetSellerProductByidModel> = (
  route,
  state
) => {
  const ProductService = inject(ProductQuereisService);
  return ProductService.GetProductById(route.params['id']).pipe(
    map((res) => {
      return res.data;
    })
  );
};
