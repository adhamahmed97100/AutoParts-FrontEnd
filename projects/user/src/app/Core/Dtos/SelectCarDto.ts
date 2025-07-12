import { CategoryDto } from './CategoryDto';
import { MakerBrandDto } from './MakerBrandDto';
import { ModelCarDto } from './ModelCarDto';
import { ModelCarEngineDto } from './ModelCarEngineDto';

export interface SelectCarDto {
  Category: CategoryDto;
  Brand: MakerBrandDto;
  Model: ModelCarDto;
  Engine: ModelCarEngineDto;
}
