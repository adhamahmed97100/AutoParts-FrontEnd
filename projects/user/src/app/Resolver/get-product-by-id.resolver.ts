import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QueriesProductService } from '../Services/Product/Queries/Handler/queries-product.service';
import { GetProductById } from '../Services/Product/Queries/Models/GetProductById';
import { map } from 'rxjs';

export const getProductByIdResolver: ResolveFn<GetProductById> = (
  route,
  state
) => {
  const ProductService = inject(QueriesProductService);

  return ProductService.getProductDetails(route.params['id']).pipe(
    map((res) => {
      return res.data;
    })
  );
};
