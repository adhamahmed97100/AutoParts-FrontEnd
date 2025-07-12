import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { BrandCarComponent } from './brand-car/brand-car.component';
import { CarPartsSelectorComponent } from './car-parts-selector/car-parts-selector.component';
import { AdvertisingComponent } from './advertising/advertising.component';
import { ModelsComponentComponent } from '../select-category/Components/models-component/models-component.component';
import { ProductCardsComponent } from './ProductCards/product-cards.component';
import { SliderAdvComponent } from './slider-adv/slider-adv.component';
import { GetCarBrandModel } from '../../../../../Services/Car/Queries/Models/GetCarBrandModel';
import { GetCategoryModel } from '../../../../../Services/Category/Queries/Models/GetCategoryModel';
import { InfoComponent } from './info/info.component';
import { GetProducts } from '../../../../../Services/Product/Queries/Models/GetProducts';
import { QueriesProductService } from '../../../../../Services/Product/Queries/Handler/queries-product.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    ProductCardsComponent,
    BrandCarComponent,
    CarPartsSelectorComponent,
    AdvertisingComponent,
    SliderAdvComponent,
    InfoComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  brands: GetCarBrandModel[] = [];
  category: GetCategoryModel[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        setTimeout(() => {
          const element = document.getElementById(fragment);
          var offset = 0;
          switch (fragment) {
            case 'Home':
              offset = 120;
              break;
            case 'categories':
              offset = 120;
              break;
            case 'brandcar':
              offset = 130;
              break;
            case 'offers':
              offset = 150;
              break;
            case 'featured':
              offset = 90;
              break;
          }
          if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition =
              elementPosition + window.pageYOffset - offset;

            // Smooth scroll with easing
            const startPosition = window.pageYOffset;
            const distance = offsetPosition - startPosition;
            const duration = 500;
            let start: number | null = null;

            function animation(currentTime: number) {
              if (start === null) start = currentTime;
              const timeElapsed = currentTime - start;
              const progress = Math.min(timeElapsed / duration, 1);

              const easeInOutCubic = (progress: number): number => {
                return progress < 0.5
                  ? 4 * progress * progress * progress
                  : 1 - Math.pow(-2 * progress + 2, 3) / 2;
              };

              window.scrollTo(
                0,
                startPosition + distance * easeInOutCubic(progress)
              );

              if (timeElapsed < duration) {
                requestAnimationFrame(animation);
              }
            }

            requestAnimationFrame(animation);
          }
        }, 100);
      }
    });
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all elements with animate-section class
    const elements = document.querySelectorAll('.animate-section');
    elements.forEach((element) => {
      observer.observe(element);
    });
  }

  handleCategorys(event: GetCategoryModel[]) {
    this.category = event;
  }

  handleCarBrands(event: GetCarBrandModel[]) {
    this.brands = event;
  }
}
