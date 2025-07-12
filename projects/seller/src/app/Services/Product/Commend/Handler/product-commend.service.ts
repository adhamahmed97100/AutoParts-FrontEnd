import { inject, Injectable } from '@angular/core';
import { ApiService } from '../../../Api/api.service';
import { AddProductModel } from '../Models/AddProductModel';
import { map, Observable } from 'rxjs';
import { Response } from '../../../../Core/BasicResponse/Response';
import { Routing } from '../../../../Meta/Routing';
import { UpdateProductModel } from '../Models/UpdateProductModel';

@Injectable({
  providedIn: 'root',
})
export class ProductCommendService {
  private readonly ApiServices = inject(ApiService);

  AddProduct(request: AddProductModel): Observable<Response<string>> {
    const formData = new FormData();

    Object.entries(request).forEach(([key, value]: any) => {
      if (key === 'FormImages') {
        for (let i = 0; i < value.length; i++) {
          formData.append('FormImages', value[i]);
        }
      } else if (key === 'MainImage') {
        formData.append('MainImage', value);
      } else if (key === 'modelCompatibilityDtos') {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(
              `modelCompatibilityDtos[${index}].minYear`,
              item.minYear
            );
            formData.append(
              `modelCompatibilityDtos[${index}].maxYear`,
              item.maxYear
            );
            formData.append(
              `modelCompatibilityDtos[${index}].modelId`,
              item.modelId
            );
          });
        }
      } else {
        formData.append(key, value);
      }
    });

    return this.ApiServices.Post<Response<string>>(
      Routing.Product.Add,
      formData
    );
  }

  UpdateProduct(requste: UpdateProductModel): Observable<Response<string>> {
    var formdata = new FormData();

    Object.entries(requste).forEach(([key, value]: any) => {
      if (key === 'FormImages' && Array.isArray(value)) {
        value.forEach((file) => formdata.append('FormImages', file));
      } else if (key === 'IdIamgesDelteted' && Array.isArray(value)) {
        value.forEach((id) => formdata.append('IdIamgesDelteted', id));
      } else if (value !== null && value !== undefined) {
        formdata.append(key, value);
      }
    });

    return this.ApiServices.Put<Response<string>>(
      Routing.Product.Update,
      formdata
    );
  }

  DeleteProduct(id: string): Observable<Response<string>> {
    return this.ApiServices.Delete<Response<string>>(
      Routing.Product.Delete,
      id
    );
  }
}
