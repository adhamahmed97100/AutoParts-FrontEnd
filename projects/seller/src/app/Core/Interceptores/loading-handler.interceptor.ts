import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
var count = 0;
export const loadingHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('Skip-Loader')) {
    return next(req); // لا تقم بتشغيل الـ spinner لهذا الطلب
  }
  count++;
  const spinner = inject(NgxSpinnerService);
  spinner.show();
  return next(req).pipe(
    finalize(() => {
      count--;
      if (count == 0) spinner.hide();
    })
  );
};
