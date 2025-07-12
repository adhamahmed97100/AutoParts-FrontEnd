import { CategoryDto } from '../../../../Core/Dtos/CategoryDto';
import { GetProductCompatibilityDto } from '../../../../Core/Dtos/getProductCompatibilityDto';
import { ProductImagesDto } from '../../../../Core/Dtos/ProductImagesDto';
import { ReviewDto } from '../../../../Core/Dtos/ReviewDto';

export interface GetSellerProductsModel {
  id: string;
  name: string;
  price: number;
  stock: number;
  mainImage: string;
  avaragarate: number;
}
