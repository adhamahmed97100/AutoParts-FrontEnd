import { ResolveFn } from '@angular/router';

import { inject } from '@angular/core';
import { map } from 'rxjs';
import { GetUserOrders } from '../Services/Orders/Queries/Model/GetUserOrders';
import { OrderCommendService } from '../Services/Orders/Commend/Handler/order-commend.service';
import { OrdersService } from '../Services/Orders/Queries/Handler/orders.service';

export const userOrdersResolver: ResolveFn<Array<GetUserOrders> | null> = (
  route,
  state
) => {
  const userId = localStorage.getItem('userId');
  if (!userId) {
    return null;
  }
  const _OrderQuereisService = inject(OrdersService);
  return _OrderQuereisService.getUserOrders(userId).pipe(
    map((res) => {
      return res.data;
    })
  );
};
