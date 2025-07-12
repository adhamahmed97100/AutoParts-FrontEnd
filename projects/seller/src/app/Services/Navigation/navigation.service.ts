import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private readonly Route = inject(Router);

  NavigationByUrl(url: string) {
    this.Route.navigateByUrl(url);
  }
}
