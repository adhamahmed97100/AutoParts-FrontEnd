import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { ApiService } from '../Api/api.service';
import { NavigationService } from '../Navigation/navigation.service';
import { Response } from '../../Core/BasicResponse/Response';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private readonly _ApiServices = inject(ApiService);
  private readonly _navigationService = inject(NavigationService);

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this._navigationService.NavigationByUrl('/Auth');
  }
}
