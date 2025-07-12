import { ProductImagesDto } from "../../../Core/Dtos/ProductImagesDto";

export interface GetcartUser {
  cardID: string;
  cardItemsDtos: CardItemDtos[];
}

export interface CardItemDtos {
  id: string;
  product: ProductDtos;
  quantity: number;
  price: number;
}
export interface ProductDtos {
  productID: string;
  name: string;
  description: string;
  price: number;
  averageRating: number;
  imagesDto: ProductImagesDto[];
}
