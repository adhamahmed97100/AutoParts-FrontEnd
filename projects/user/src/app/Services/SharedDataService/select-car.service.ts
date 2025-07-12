import { Injectable } from '@angular/core';
import { GetUserIdModel } from '../User/Queries/Models/GetUserIdModels';
import { PhoneNumberDto } from '../../Core/Dtos/PhoneNumberDto';
import { shippingAddressesDto } from '../../Core/Dtos/shippingAddressesDto';
import { BehaviorSubject } from 'rxjs';
import { SelectCarDto } from '../../Core/Dtos/SelectCarDto';
import { MakerBrandDto } from '../../Core/Dtos/MakerBrandDto';
import { CategoryDto } from '../../Core/Dtos/CategoryDto';
import { ModelCarEngineDto } from '../../Core/Dtos/ModelCarEngineDto';
import { ModelCarDto } from '../../Core/Dtos/ModelCarDto';

@Injectable({
  providedIn: 'root',
})
export class SelectCarService {
  private Selector = new BehaviorSubject<SelectCarDto>({
    Brand: {} as MakerBrandDto,
    Category: {} as CategoryDto,
    Engine: {} as ModelCarEngineDto,
    Model: {} as ModelCarDto,
  });
  CurrentSelector = this.Selector.asObservable();

  updatebrand(brand: MakerBrandDto) {
    const currentData = this.Selector.value;
    this.Selector.next({ ...currentData, Brand: brand });
  }
  updatecategory(category: CategoryDto) {
    const currentData = this.Selector.value;
    this.Selector.next({ ...currentData, Category: category });
  }
  updateEngine(Engine: ModelCarEngineDto) {
    const currentData = this.Selector.value;
    this.Selector.next({ ...currentData, Engine: Engine });
  }
  updateModel(Model: ModelCarDto) {
    const currentData = this.Selector.value;

    this.Selector.next({ ...currentData, Model: Model });
  }
  updatesuer(Selector: SelectCarDto) {
    this.Selector.next(Selector);
  }
}
