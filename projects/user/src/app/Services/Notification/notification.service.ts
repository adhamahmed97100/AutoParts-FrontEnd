import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { Routing } from '../../Meta/Routing';
import { Messaging } from '@angular/fire/messaging';
import { getToken, onMessage } from 'firebase/messaging';
import { GetUserNotification } from './Models/GetUserNotification';
import { Response } from '../../Core/BasicResponse/Response';
import { ApiService } from '../Api/api.service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private hubConnection!: signalR.HubConnection;

  private notificationSubject = new Subject<GetUserNotification>();
  private readonly Api = inject(ApiService);
  private readonly messaging = inject(Messaging);
  notifications$ = this.notificationSubject.asObservable();
  IP: string = Routing.Ip;
  constructor() {
    this.startConnection();
  }

  GetNotifications(
    id: string
  ): Observable<Response<Array<GetUserNotification>>> {
    return this.Api.Get<Response<Array<GetUserNotification>>>(
      Routing.Notification.GetUserNotification.replace('{Id}', id)
    );
  }
  private startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${this.IP}/notificationHub?userId=${localStorage.getItem('userId')}`
      )

      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connected'))
      .catch((err) => console.error('SignalR connection error: ', err));

    this.hubConnection.on(
      'ReceiveNotification',
      (message: GetUserNotification) => {
        console.log(message);
        this.notificationSubject.next(message);
      }
    );
  }

  sendNotification(message: string) {
    this.hubConnection
      .invoke('SendNotificationToUser', message)
      .catch((err) => console.error(err));
  }

  async checkAndSendToken(): Promise<boolean> {
    const currentToken = await this.requestPermission();
    if (!currentToken) {
      console.log('No token available.');
      return false;
    }
    const storedToken = localStorage.getItem('fcmToken');
    if (storedToken !== currentToken) {
      this.sendTokenToServer(
        currentToken,
        localStorage.getItem('userId') || ''
      );
      localStorage.setItem('fcmToken', currentToken);
      return true;
    } else {
      console.log('Token has not changed, no need to send.');
      return true;
    }
  }
  sendTokenToServer(token: string, userId: string) {
    this.Api.Post(Routing.Notification.SetTokenNotificationToUser, {
      userId,
      token,
    }).subscribe({
      next: (res) => {
        console.log('Token sent successfully:', res);
      },
    });
  }

  async requestPermission(): Promise<string | null> {
    try {
      const permission = await Notification.requestPermission();
      console.log('Notification permission:', permission);

      if (permission !== 'granted') {
        return null;
      }
      const token = await getToken(this.messaging, {
        vapidKey: environment.firebase.vapidKey,
      });
      if (!token) {
        return null;
      }
      return token;
    } catch (error) {
      console.error('Error requesting permission:', error);
      return null;
    }
  }

  listenForMessages() {
    console.log('Listening for messages...');
    onMessage(this.messaging, (payload) => {
      console.log('Message received:', payload);
      if (payload.notification?.title && payload.notification?.body) {
        const notification = new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: 'Logo/2.svg',
          badge: 'Logo/2.svg',
          requireInteraction: true,
          silent: false,
          tag: 'notification',
        });
      }
    });
  }
}
