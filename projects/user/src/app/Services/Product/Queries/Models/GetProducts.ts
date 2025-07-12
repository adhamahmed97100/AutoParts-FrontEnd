import { CategoryDto } from '../../../../Core/Dtos/CategoryDto';
import { ProductImagesDto } from '../../../../Core/Dtos/ProductImagesDto';
import { SellerDto } from '../../../../Core/Dtos/SellerDto';

export interface GetProducts {
  productID: string;
  name: string;
  description: string;
  averageRating: number;
  price: number;
  stockQuantity: number;
  seller: SellerDto;
  category: CategoryDto;
  images: ProductImagesDto[];
}