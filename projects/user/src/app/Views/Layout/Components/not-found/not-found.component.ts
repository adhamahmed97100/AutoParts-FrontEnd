import { Component, inject } from '@angular/core';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  private readonly _navigationService = inject(NavigationService);
  GetHomePage() {
    this._navigationService.NavigationByUrl('Public/Home');
  }
}
