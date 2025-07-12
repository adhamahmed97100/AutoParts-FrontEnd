import {
  AfterViewChecked,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { MatFormSharedModule } from '../../../../Shared/Modules/mat-form-shared.module';
import { SharedDataService } from '../../../../Services/SharedDataService/shared-data.service';
import { ChatService } from '../../../../Services/Chat/chat.service';
import { SendMassgeToCahtModel } from '../../../../Services/Chat/Models/SendMassgeToCahtModel';
import { MarkdownPipe } from '../../../../Shared/pipe/markdown.pipe';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { ToastrService } from 'ngx-toastr';
import { SharedModuleModule } from '../../../../Shared/Modules/shared-module.module';

@Component({
  selector: 'app-chatbot',
  imports: [MatFormSharedModule, MarkdownPipe, SharedModuleModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  //#region Variables
  private chatSubscription: Subscription | null = null; // متغير لتخزين الاشتراك
  user: any;
  isOpen: boolean = false;
  chatStarted: boolean = false;
  newMessage: string = '';
  userInput: string = '';
  autoScrollEnabled: boolean = true;
  selectedFile: File | null = null;
  previewImage: string | null = null;
  tempmsg: string = '';
  botResponse: string = '';
  isTyping: boolean = false;
  index = 0;
  typingInterval: any = null;
  messages: {
    sender: string;
    content: string;
    time: string;
    image?: string | null;
  }[] = [];
  Userid = localStorage.getItem('userId');

  @ViewChild('chatBox') chatBox!: ElementRef;
  //#endregion

  //#region Lifecycle Hooks

  ngAfterViewChecked() {
    if (this.autoScrollEnabled) {
      this.scrollToBottom();
    }
  }
  //#endregion

  //#region Dependencies
  private readonly _ChatServcies = inject(ChatService);
  private readonly _sharedServices = inject(SharedDataService);
  private readonly _Navigation = inject(NavigationService);
  private readonly _tostar = inject(ToastrService);
  //#endregion

  //#region Methods
  toggleChat() {
    if (this.isOpen) {
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow) {
        chatWindow.classList.add('closing');
        setTimeout(() => {
          this.isOpen = false;
          chatWindow.classList.remove('closing');
        }, 300);
      }
    } else {
      this.isOpen = true;
      const chatWindow = document.querySelector('.chat-window');
      if (chatWindow) {
        chatWindow.classList.add('opening');

        setTimeout(() => {
          chatWindow.classList.remove('opening');
        }, 300);
      }
    }
  }

  clearImage() {
    this.selectedFile = null;
    this.previewImage = null;
    var selectedFile = document.getElementById('fileInput') as HTMLInputElement;
    selectedFile.value = '';
  }

  sendMessage() {
    if (!this.userInput.trim()) return;
    const userMessage = {
      sender: 'You',
      content: this.userInput,
      image: this.previewImage,
      time: new Date().toLocaleTimeString(),
    };

    this.messages.push(userMessage);

    if (this.chatSubscription) {
      this.chatSubscription.unsubscribe();
    }
    const request: SendMassgeToCahtModel = {
      UserId: this.user.id,
      Text: this.userInput,
      File: this.selectedFile ? this.selectedFile : null,
    };

    this.isTyping = true;

    let typingMessage = {
      sender: 'Support',
      content: '',
      time: new Date().toLocaleTimeString(),
    };

    this.messages.push(typingMessage);
    this.tempmsg = '';
    this.index = 0;
    this.chatSubscription = this._ChatServcies.getResponse(request).subscribe({
      next: (response) => {
        this.simulateTyping(response, typingMessage);
      },
      error: (err) => {
        console.error('Error receiving stream:', err);
        this.isTyping = false;
      },
    });
    this.userInput = '';
    this.previewImage = null;
    this.selectedFile = null;
    this.clearImage();
  }

  simulateTyping(response: any, typingMessage: any) {
    this.isTyping = true;
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
    }
    this.tempmsg += response;
    this.typingInterval = setInterval(() => {
      if (this.index < this.tempmsg.length) {
        typingMessage.content += this.tempmsg[this.index];
        this.index++;
      } else {
        clearInterval(this.typingInterval);
        this.typingInterval = null;
        this.isTyping = false;
        this.tempmsg = '';
        this.index = 0;
      }
    }, 40);
  }

  onFileSelected(event: any) {
    console.log(event.target.files[0]);

    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onScroll(): void {
    const chatBox = this.chatBox.nativeElement;
    const nearBottom =
      chatBox.scrollHeight - chatBox.scrollTop <= chatBox.clientHeight + 50;

    if (!nearBottom) {
      this.autoScrollEnabled = false;
    } else {
      this.autoScrollEnabled = true;
    }
  }

  scrollToBottom(): void {
    try {
      if (this.chatBox && this.chatBox.nativeElement) {
        this.chatBox.nativeElement.scrollTop =
          this.chatBox.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error('Scrolling error:', err);
    }
  }

  StopMassage() {
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
      this.typingInterval = null;
      this.isTyping = false;
      this.tempmsg = '';
      this.index = 0;

      if (this.chatSubscription) {
        this.chatSubscription.unsubscribe();
        this.chatSubscription = null;
      }
    }
    this.isTyping = false;
  }
  ngOnInit(): void {
    this._sharedServices.currentCUser.subscribe((res) => {
      this.user = res;
    });
  }
  adjustTextareaHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }
  startNewChat() {
    if (this.Userid) {
      if (!this.chatStarted || this.messages.length > 1) {
        this._ChatServcies.NewChat(this.Userid).subscribe({
          next: () => {
            this.chatStarted = true;
            this.messages = [];
            this.StopMassage();
            this.messages.push({
              sender: 'Tech Support',
              content: '👋 Hello! How can we assist you today?',
              time: new Date().toLocaleTimeString(),
            });
          },
          error: (error) => {
            this._tostar.error(error.error.message);
          },
        });
      }
    } else {
      this._Navigation.NavigationByUrl('Auth/Login');
    }
  }
}
