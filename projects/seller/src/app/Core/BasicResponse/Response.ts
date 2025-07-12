import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

export class Response<T> {
  httpStatusCode!: HttpStatusCode;
  success!: boolean;
  message!: string;
  meta!: object;
  data!: T;
  errors!: string[];
}
