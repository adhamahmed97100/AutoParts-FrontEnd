import { orderStatusDto } from '../../../../Core/Dtos/orderStatusDto';

export interface UpdateStatsOrder {
  productID: string;
  orderId: string;
  status: orderStatusDto;
  cancellationReason?: string;
}
