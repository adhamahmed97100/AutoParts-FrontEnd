import { CanMatchFn } from '@angular/router';
import { inject } from '@angular/core';
import { NavigationService } from '../Services/Navigation/navigation.service';
export const authGuard: CanMatchFn = (route, segments) => {
  const _NavigationService = inject(NavigationService);
  const token = localStorage.getItem('token');
  var userid = localStorage.getItem('userId');
  if (!token || !userid) {
    _NavigationService.NavigationByUrl('Auth/Login');
    return false;
  }
  return true;
};
