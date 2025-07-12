import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly Routing = inject(Router);

  NavigationByUrl(Url: string) {
    this.Routing.navigateByUrl(Url);
  }
  NavigationByUrlWithReload(url: string) {
    this.Routing.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.Routing.navigateByUrl(url);
    });
  }
}
