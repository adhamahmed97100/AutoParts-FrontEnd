import { environment } from '../../environments/environment';

export class Routing {
  static Ip = environment.Ip;
  static SingelId = '{Id}';
  static SingelName = '{Name}';
  static SingelEmail = '{email}';
  static Root = 'Api';
  static Version = 'V1';
  static Role = Routing.Ip + '/' + Routing.Root + '/' + Routing.Version + '/';
  static Category = {
    GetCategoryAll: Routing.Role + 'Category/All',
    GetCategoryById: Routing.Role + 'Category/{Id}',
  };

  static Model = {
    GetModelsWithBarnd: Routing.Role + 'Model/GetModelWithBrand/{Id}',
    GetModelById: Routing.Role + 'Model/GetModelById/{Id}',
    AddModelCompatibility: Routing.Role + 'Model/AddModelCompatibility',
    UpdateModelCompatibility: Routing.Role + ' ',
  };

  static Seller = {
    Prefix: Routing.Role + 'Seller/',
    GetSellers: Routing.Role + 'Seller/GetSellers',
    GetSellersById: Routing.Role + 'Seller/{Id}',
    GetSellersProducts: Routing.Role + 'Seller/GetSellersProducts',
    GetSellerProductById: Routing.Role + 'Seller/GetSellerProductById/{Id}',
    SellerEamilIsExist: Routing.Role + 'Seller/SellerEamilIsExist',
  };

  static Review = {
    Prefix: Routing.Role + 'Review/',
    Add: Routing.Role + 'Review/Add',
    Update: Routing.Role + 'Review/Update',
    Pagination: Routing.Role + 'Review/Pagination',
    ProductReview: Routing.Role + 'Review/ProductReview',
    GetRatingStatistics: Routing.Role + 'Review/GetRatingStatistics/{Id}',
    Delete: Routing.Role + 'Review/{Id}',
    GetById: Routing.Role + 'Review/{Id}',
  };

  static Mail = {
    Prefix: Routing.Role + 'Mail/',
    SendOtp: Routing.Role + 'Mail/SendOtp',
    VerifyOtp: Routing.Role + 'Mail/VerifyOtp',
  };

  static Notification = {
    Prefix: Routing.Role + 'Notification/',
    GetSellerNotification:
      Routing.Role + 'Notification/GetSellerNotification/{Id}',
    SetNotificationTokenTopic:
      Routing.Role + 'Notification/SetNotificationTokenTopic',
    SetTokenNotificationToUser:
      Routing.Role + 'Notification/SetTokenNotificationToUser',
    SendNotificationTopic: Routing.Role + 'Notification/SendNotificationTopic',
    SendNotificationToUser:
      Routing.Role + 'Notification/SendNotificationToUser',
  };

  static Car = {
    GetCarBrandsWithPagination: Routing.Role + 'CarBrand/Pagination',
  };

  static Authentication = {
    RegisterSeller: Routing.Role + 'Auth/Register/Seller',
    LoginSeller: Routing.Role + 'Auth/LoginSeller',

    EmailExist: Routing.Role + 'Auth/EmailExist/{Email}',
    UserNameExist: Routing.Role + 'Auth/UserNameExist/{Name}',
  };

  static Product = {
    Add: Routing.Role + 'Product/Add',
    Update: Routing.Role + 'Product/Update',

    Delete: Routing.Role + 'Product/{Id}',
    GetMaster: Routing.Role + 'Product/GetMaster/{Id}',
    GetById: Routing.Role + 'Product/{Id}',
  };

  static Orders = {
    Prefix: Routing.Role + 'Order/',
    Update: Routing.Role + 'Order/Update',
    UpdateStatus: Routing.Role + 'Order/UpdateStatus',
    Delete: Routing.Role + 'Order/{Id}',
    Cancel: Routing.Role + 'Order/Cancel/{Id}',
    GetById: Routing.Role + 'Order/{Id}',
    GetUserOrders: Routing.Role + 'Order/UserOrders/{Id}',
    GetSellerOrders: Routing.Role + 'Order/SellerOrders/',
  };
}
