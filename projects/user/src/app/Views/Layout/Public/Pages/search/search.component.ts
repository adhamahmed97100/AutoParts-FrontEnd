import { Component, inject, OnInit } from '@angular/core';
import { ProductCardsComponent } from '../home/ProductCards/product-cards.component';
import { ActivatedRoute } from '@angular/router';
import { AdvertisingComponent } from '../home/advertising/advertising.component';
import { InfoComponent } from '../home/info/info.component';
import { ScrollService } from '../../../../../Services/scroll.service';

@Component({
  selector: 'app-search',
  imports: [ProductCardsComponent, InfoComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  search: string = '';
  filter: any = {};

  constructor(private scrollService: ScrollService) {}

  ngOnInit(): void {
    this._Routing.params.subscribe((res) => {
      this.filter = { ProductName: res['text'] };
      setTimeout(() => {
        this.scrollService.smoothScroll(1000);
      }, 50);
    });
  }
  private readonly _Routing = inject(ActivatedRoute);
}
