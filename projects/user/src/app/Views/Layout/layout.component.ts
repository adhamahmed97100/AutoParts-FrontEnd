import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ChatbotComponent } from './security/chatbot/chatbot.component';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, NavBarComponent, FooterComponent, ChatbotComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {}
