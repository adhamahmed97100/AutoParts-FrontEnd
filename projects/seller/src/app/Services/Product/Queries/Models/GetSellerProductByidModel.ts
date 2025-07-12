import { CategoryDto } from '../../../../Core/Dtos/CategoryDto';
import { GetProductCompatibilityDto } from '../../../../Core/Dtos/getProductCompatibilityDto';
import { ProductImagesDto } from '../../../../Core/Dtos/ProductImagesDto';

export interface GetSellerProductByidModel {
  id: string;
  name: string;
  descreption: string;
  subDescreption: string;
  price: number;
  stock: number;
  productImagesDto: ProductImagesDto[];
  avaragarate: number;
  category: CategoryDto;
  modelCompatibilityDto: GetProductCompatibilityDto[];
}
