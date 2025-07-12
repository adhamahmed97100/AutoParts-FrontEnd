import { environment } from '../../environments/environment';

export class Routing {
  static Ip = environment.Ip;
  static Root = '/Api/';
  static Version = 'V1/';
  static Role = Routing.Ip + Routing.Root + Routing.Version;

  static Product = {
    AddProduct: Routing.Role + 'Product/Add',
    UpdateProduct: Routing.Role + 'Product/Update',
    GetProductPagination: Routing.Role + 'Product/Pagination',
    GetProductDetails: Routing.Role + 'Product/{Id}',
    AutoCompleteSearch: Routing.Role + 'Product/AutoCompleteSearch/{Text}',
  };

  static Authentication = {
    LoginUser: Routing.Role + 'Auth/Login',
    GetToken: Routing.Role + 'Auth/Get-Token/',
    LoginWihtGoogle: Routing.Role + 'Auth/Google-Login',
    AuthCallBackGoogle: Routing.Role + 'Auth/Google-Response',
    RegisterUser: Routing.Role + 'Auth/Register/User',
  };

  static Car = {
    GetCarBrandsWithPagination: Routing.Role + 'CarBrand/Pagination',
    GetCarBrandsById: Routing.Role + 'CarBrand/{Id}',
  };

  static Category = {
    GetCategoryAll: Routing.Role + 'Category/All',
    GetCategoryById: Routing.Role + 'Category/{Id}',
  };

  static User = {
    GetUserById: Routing.Role + 'User/{Id}',
    UpdateUser: Routing.Role + 'User/update',
    AddPhones: Routing.Role + 'User/AddPhones',
    GetPhones: Routing.Role + 'User/GetPhones/{Id}',
    AddShippingAddresses: Routing.Role + 'User/AddShippingAddresses',
    GetShippingAddresses: Routing.Role + 'User/ShippingAddresses/{Id}',
  };

  static Model = {
    GetModelsWithBarnd: Routing.Role + 'Model/GetModelWithBrand/{Id}',
    GetModelById: Routing.Role + 'Model/GetModelById/{Id}',
  };

  static Cart = {
    GetCart: Routing.Role + 'card/{Id}',
    AddToCart: Routing.Role + 'UserCard/Add',
    UpdateItem: Routing.Role + 'UserCard/Update',
    RemoveItem: Routing.Role + 'UserCard/{Id}',
  };

  static Review = {
    Add: Routing.Role + 'Review/Add',
    ProductReview: Routing.Role + 'Review/ProductReview',
    GetReviewStatistic: Routing.Role + 'Review/GetRatingStatistics/{Id}',
  };

  static Chat = {
    Prefix: Routing.Role + 'Chat/',
    SendMassage: Routing.Role + 'Chat/SendMassage',
    NewChat: Routing.Role + 'Chat/NewChat/{Id}',
  };
  static Payment = {
    Prefix: Routing.Role + 'Payment/',
    GetUrlpayment: Routing.Role + 'Payment/GetUrlpayment',
  };

  static Order = {
    GetUserOrder: Routing.Role + 'Order/UserOrders/{id}',
    AddUserOrder: Routing.Role + 'Order/AddTest',
  };
  static Notification = {
    GetUserNotification: Routing.Role + 'Notification/GetUserNotification/{Id}',
    SetNotificationTokenTopic:
      Routing.Role + 'Notification/SetNotificationTokenTopic',
    SetTokenNotificationToUser:
      Routing.Role + 'Notification/SetTokenNotificationToUser',
    SendNotificationTopic: Routing.Role + 'Notification/SendNotificationTopic',
    SendNotificationToUser:
      Routing.Role + 'Notification/SendNotificationToUser',
  };
}
