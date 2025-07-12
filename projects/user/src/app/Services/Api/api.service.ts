import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  //#region Injection
  private readonly Http = inject(HttpClient);
  //#endregion

  //#region Implemntation
  GetWithPagination<T>(
    Url: string,
    PageNumber: number,
    PageSize: number,
    Filter?: object
  ): Observable<T> {
    var Prams = new HttpParams();
    Prams = Prams.append('PageNumber', PageNumber);
    Prams = Prams.append('PageSize', PageSize);
    if (Filter) {
      Object.entries(Filter).forEach(([key, value]: any) => {
        if (value) Prams = Prams.append(key, value);
      });
    }

    return this.Http.get<T>(Url, { params: Prams });
  }
  Get<T>(Url: string, options: object = {}): Observable<T> {
    return this.Http.get<T>(Url, options);
  }
  Post<T>(Url: string, Body: object, options: object = {}): Observable<T> {
    return this.Http.post<T>(Url, Body, { withCredentials: true, ...options });
  }

  Put<T>(Url: string, Body: object, options: object = {}): Observable<T> {
    return this.Http.put<T>(Url, Body, { withCredentials: true, ...options });
  }
  Delete<T>(Url: string, Id: string): Observable<T> {
    return this.Http.delete<T>(Url.replace('{Id}', Id));
  }
  //#endregion
}
