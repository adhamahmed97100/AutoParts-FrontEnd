import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { GetUserOrders } from '../Model/GetUserOrders';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Routing } from '../../../../Meta/Routing';
import { Response } from '../../../../Core/BasicResponse/Response';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private Api: ApiService) {}
  // دالة للحصول على طلبات المستخدم
  getUserOrders(userId: string): Observable<Response<GetUserOrders[]>> {
    const url = Routing.Order.GetUserOrder.replace('{id}', userId); // تعويض الـ id بالـ userId
    return this.Api.Get<Response<GetUserOrders[]>>(url);
  }
}
