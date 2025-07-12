import { ProductImagesDto } from '../../../../Core/Dtos/ProductImagesDto';

import { SellerDto } from '../../../../Core/Dtos/SellerDto';
import { GetProductReviowsModel } from '../../../Rating/Queries/Model/GetProductReviowsModel';

export interface GetProductById {
  reviewDto: GetProductReviowsModel[];
  productID: string;
  suk: string;
  name: string;
  description: string;
  averageRating: number;
  price: number;
  stockQuantity: number;
  seller: SellerDto;
  images: ProductImagesDto[];
}
