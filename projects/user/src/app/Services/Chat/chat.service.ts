import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../Api/api.service';
import { SendMassgeToCahtModel } from './Models/SendMassgeToCahtModel';
import { Routing } from '../../Meta/Routing';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private readonly _ApiServices = inject(ApiService);

  getResponse(request: SendMassgeToCahtModel): Observable<string> {
    return new Observable<string>((observer) => {
      const formData = new FormData();
      formData.append('Text', request.Text);
      formData.append('UserId', request.UserId);
      if (request.File) formData.append('File', request.File);

      fetch(Routing.Chat.SendMassage, {
        method: 'POST',
        body: formData,
        headers: {
          'Skip-Loader': 'true',
        },
      })
        .then((response) => {
          const reader = response.body?.getReader();
          const decoder = new TextDecoder();

          const processText = ({
            done,
            value,
          }: ReadableStreamReadResult<Uint8Array>) => {
            if (done) {
              observer.complete();
              return;
            }
            const chunk = decoder.decode(value, { stream: true });
            observer.next(chunk); // إرسال الرد تدريجيًا
            reader?.read().then(processText);
          };

          return reader?.read().then(processText);
        })
        .catch((error) => observer.error(error));

      return () => {
        // Cleanup لو احتجت
      };
    });
  }

  NewChat(Id: string): Observable<string> {
    return this._ApiServices.Post<string>(
      Routing.Chat.NewChat.replace('{Id}', Id),
      Object,
      {
        headers: {
          'Skip-Loader': 'true',
        },
      }
    );
  }

  // getResponse(request: SendMassgeToCahtModel): Observable<string> {
  //   const form = new FormData();
  //   form.append('Text', request.Text);
  //   form.append('UserId', request.UserId);
  //   if (request.File) form.append('File', request.File);

  //   return this._ApiServices
  //     .Post<string>(Routing.Chat.SendMassage, form, {
  //       headers: new HttpHeaders().set('Skip-Loader', 'true'),
  //     })
  //     .pipe(map((response: Response<string>) => response.data));
  // }
}
