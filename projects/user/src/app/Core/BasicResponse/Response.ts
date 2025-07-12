import { HttpStatusCode } from '@angular/common/http';

export interface Response<T> {
  httpStatusCode: HttpStatusCode;
  success: boolean;
  message: string;
  meta: object;
  data: T;
  errors: string[];
}
