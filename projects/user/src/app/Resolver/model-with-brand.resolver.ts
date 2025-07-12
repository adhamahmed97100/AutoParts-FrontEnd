import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ModelQuereisService } from '../Services/Models/Quereis/Handler/model-quereis.service';
import { map } from 'rxjs';
import { GetModelWithBrand } from '../Services/Models/Quereis/Models/GetModelWithBrand';

export const modelWithBrandResolver: ResolveFn<Array<GetModelWithBrand>> = (
  route,
  state
) => {
  const ModelService = inject(ModelQuereisService);
  return ModelService.GetModelsWithBarnd(route.params['brandId']).pipe(
    map((res) => {
      return res.data;
    })
  );
};
