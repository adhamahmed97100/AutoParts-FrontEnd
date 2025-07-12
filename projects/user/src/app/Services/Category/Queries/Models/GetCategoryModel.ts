export interface GetCategoryModel {
  categoryID: string;
  name: string;
  image: string;
  subCategories: GetCategoryModel[];
}
