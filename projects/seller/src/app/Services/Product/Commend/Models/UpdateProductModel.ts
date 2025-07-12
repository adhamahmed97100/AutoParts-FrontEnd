export interface UpdateProductModel {
  Id: string;
  Name?: string;
  Description?: string;

  Price?: number;
  FormImages?: File[];
  MainImages?: File;
  IdIamgesDelteted?: string[];
  StockQuantity?: number;
  SellerID?: string;
  CategoryID?: string;
}
