import { userDto } from '../../../../Core/Dtos/userDto';

export interface GetProductReviowsModel {
  reviewID: string;

  user: userDto;

  rating: number;

  comment: string;

  reviewDate: string;
}
