import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { catchError, switchMap, throwError, from, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../../Services/Token/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(TokenService);
  const toastrService = inject(ToastrService);
  const token = authService.getToken();

  const clonedRequest = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        toastrService.error('Unauthorized: Please login again.', 'Error');
      } else if (error.status === 0) {
        toastrService.error(
          'Network error: Please check your connection.',
          'Error'
        );
      } else {
        toastrService.error(error.message || 'An error occurred', 'Error');
      }
      return throwError(() => error);
    })
  );
};
