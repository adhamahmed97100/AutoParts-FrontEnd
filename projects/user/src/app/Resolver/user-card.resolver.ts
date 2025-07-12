import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { CartService } from '../Services/Cart/Handler/cart.service';

import { map } from 'rxjs';
import { GetcartUser } from '../Services/Cart/Models/CartItem';

export const userCardResolver: ResolveFn<GetcartUser | null> = (
  route,
  state
) => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return null;
  }
  const _CardQueriesService = inject(CartService);
  return _CardQueriesService.getCart(userId).pipe(
    map((res) => {
      return res.data;
    })
  );
};
