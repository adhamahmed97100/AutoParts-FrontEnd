import { Component, inject } from '@angular/core';
import { MakerBrandDto } from '../../../../../Core/Dtos/MakerBrandDto';
import { Routing } from '../../../../../Meta/Routing';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { ScrollService } from '../../../../../Services/scroll.service';
import { SharedModuleModule } from '../../../../../Shared/Modules/shared-module.module';
import { GetCategoryModel } from '../../../../../Services/Category/Queries/Models/GetCategoryModel';
import { filter } from 'rxjs';
import { CategoryQuereisService } from '../../../../../Services/Category/Queries/Handler/category-quereis.service';

@Component({
  selector: 'app-select-brand',
  imports: [SharedModuleModule, RouterModule],
  templateUrl: './select-brand.component.html',
  styleUrl: './select-brand.component.css',
})
export class SelectBrandComponent {
  Brand: MakerBrandDto = {} as MakerBrandDto;
  Category: any;
  currentStep = 1;
  IP: string = Routing.Ip;
  categoryId: string = '';
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly categoryService = inject(CategoryQuereisService);
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    this.route.data.subscribe(({ BrandById }) => {
      this.Brand = BrandById;
    });
    this.GetAllRouteParams(this.route.root);

    setTimeout(() => {
      this.scrollService.smoothScroll(1000);
    }, 100);
  }

  GetAllRouteParams(route: ActivatedRoute) {
    const params = route.snapshot.paramMap;
    params.keys.forEach((key) => {
      console.log(key);
      if (key === 'CategoryId') {
        this.categoryId = params.get(key) ?? '';
        this.categoryService
          .GetCategoryById(this.categoryId)
          .subscribe((res) => {
            this.Category = res.data;
          });
      }
    });

    route.children.forEach((child) => this.GetAllRouteParams(child));
  }
  manufacturers: Manufacturer[] = [
    { name: 'Bosch', logo: 'Brands/1.png' },
    { name: 'Mahle', logo: 'Brands/2.png' },
    { name: 'K&N', logo: 'Brands/3.png' },
    { name: 'Blue Print', logo: 'Brands/4.png' },
    { name: 'Champion', logo: 'Brands/5.png' },
  ];

  currentSlide = 0;
  // listenToParams(route: ActivatedRoute) {
  //   route.paramMap.subscribe((params) => {
  //     params.keys.forEach((key) => {
  //       console.log(key);
  //     });
  //   });

  //   route.children.forEach((child) => this.listenToParams(child));
  // }
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.manufacturers.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.manufacturers.length) %
      this.manufacturers.length;
  }
}
interface Manufacturer {
  name: string;
  logo: string;
}
