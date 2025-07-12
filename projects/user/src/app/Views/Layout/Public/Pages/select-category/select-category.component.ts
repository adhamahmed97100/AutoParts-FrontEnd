import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { CategoryDto } from '../../../../../Core/Dtos/CategoryDto';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Routing } from '../../../../../Meta/Routing';
import { SharedModuleModule } from '../../../../../Shared/Modules/shared-module.module';
import { ScrollService } from '../../../../../Services/scroll.service';

@Component({
  selector: 'app-select-category',
  imports: [SharedModuleModule, RouterModule],
  templateUrl: './select-category.component.html',
  styleUrl: './select-category.component.css',
})
export class SelectCategoryComponent implements OnInit {
  category: CategoryDto = {} as CategoryDto;
  currentStep = 1;
  IP: string = Routing.Ip;
  private readonly route = inject(ActivatedRoute);
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    this.route.data.subscribe(({ CategoryId }) => {
      this.category = CategoryId;
    });
    setTimeout(() => {
      this.scrollService.smoothScroll(1000);
    }, 100);
  }

  manufacturers: Manufacturer[] = [
    { name: 'Bosch', logo: 'Brands/1.png' },
    { name: 'Mahle', logo: 'Brands/2.png' },
    { name: 'K&N', logo: 'Brands/3.png' },
    { name: 'Blue Print', logo: 'Brands/4.png' },
    { name: 'Champion', logo: 'Brands/5.png' },
  ];

  currentSlide = 0;

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
