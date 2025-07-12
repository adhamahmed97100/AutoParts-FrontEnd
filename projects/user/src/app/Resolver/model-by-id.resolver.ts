import { ResolveFn } from '@angular/router';
import { ModelQuereisService } from '../Services/Models/Quereis/Handler/model-quereis.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { GetModelWithBrand } from '../Services/Models/Quereis/Models/GetModelWithBrand';

export const modelByIdResolver: ResolveFn<GetModelWithBrand> = (
  route,
  state
) => {
  const ModelService = inject(ModelQuereisService);
  return ModelService.GetModelById(route.params['modelId']).pipe(
    map((res) => {
      return res.data;
    })
  );
};
