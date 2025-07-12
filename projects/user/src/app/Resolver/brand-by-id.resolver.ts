import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { MakerBrandDto } from '../Core/Dtos/MakerBrandDto';
import { CarBrandQueriesService } from '../Services/Car/Queries/Handler/car-brand-queries.service';
import { map } from 'rxjs';

export const brandByIdResolver: ResolveFn<MakerBrandDto> = (route, state) => {
  const _CarBrandQueriesService = inject(CarBrandQueriesService);
  return _CarBrandQueriesService.GetBrandById(route.params['brandId']).pipe(
    map((res) => {
      return res.data;
    })
  );
};
