import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotificationService } from './Services/Notification/notification.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'user';
  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationService.listenForMessages();
  }
}
