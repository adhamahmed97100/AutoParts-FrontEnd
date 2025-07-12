import { Component, inject, OnInit } from '@angular/core';
import { GetUserIdModel } from '../../../../Services/User/Queries/Models/GetUserIdModels';
import { SharedDataService } from '../../../../Services/SharedDataService/shared-data.service';
import { UserQuereisService } from '../../../../Services/User/Queries/Handler/user-quereis.service';
import { RouterModule } from '@angular/router';
import { SharedModuleModule } from '../../../../Shared/Modules/shared-module.module';
import { NavigationService } from '../../../../Services/Navigation/navigation.service';
import { QueriesProductService } from '../../../../Services/Product/Queries/Handler/queries-product.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../../../Services/Notification/notification.service';
import { GetUserNotification } from '../../../../Services/Notification/Models/GetUserNotification';
import { NotFoundComponent } from '../not-found/not-found.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule, SharedModuleModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements OnInit {
  user: GetUserIdModel = {
    name: 'UserName',
    countCard: 0,
    picture: '',
    dateCreate: '',
    email: '',
    id: '',
    phoneNumberDtos: [],
    shippingAddresses: [],
  };
  userid = localStorage.getItem('userId');
  searchResults: string[] = [];
  showSearchResults = false;
  isLoading = false;
  currentSearchTerm = '';
  private searchSubject = new Subject<string>();

  private readonly sharedDataService = inject(SharedDataService);
  private readonly _UserQuereisService = inject(UserQuereisService);
  private readonly _Navigation = inject(NavigationService);
  private readonly _ProductService = inject(QueriesProductService);
  private readonly _toster = inject(ToastrService);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly _notificationService = inject(NotificationService);
  notifications: GetUserNotification[] = [];
  ngOnInit(): void {
    this.getUserData();
    this.setupSearch();
    if (this.userid) {
      this._notificationService
        .GetNotifications(this.userid)
        .subscribe((res) => {
          this.notifications = res.data;
        });
    }
    this._notificationService.notifications$.subscribe((message) => {
      this.notifications.push(message);
    });
  }

  private setupSearch() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchText) => {
        if (searchText.length > 3) {
          this.isLoading = true;
          this.showSearchResults = true;
          this.currentSearchTerm = searchText;
          this._ProductService.AutoCompleteSearch(searchText).subscribe({
            next: (response) => {
              this.searchResults = response.data;
              this.isLoading = false;
            },
            error: (error) => {
              console.error('Search error:', error);
              this.searchResults = [];
              this.isLoading = false;
            },
          });
        } else {
          this.searchResults = [];
          this.showSearchResults = false;
          this.isLoading = false;
          this.currentSearchTerm = '';
        }
      });
  }

  highlightSearchTerm(text: string): SafeHtml {
    if (!this.currentSearchTerm)
      return this.sanitizer.bypassSecurityTrustHtml(text);

    const regex = new RegExp(
      `(${this.escapeRegExp(this.currentSearchTerm)})`,
      'gi'
    );
    const highlightedText = text.replace(
      regex,
      '<mark class="highlight">$1</mark>'
    );
    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  onSearchInput(event: Event) {
    const searchText = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchText);
  }
  search() {
    const inputElem = document.getElementById('Input') as HTMLInputElement;
    if (inputElem) {
      this._Navigation.NavigationByUrl(`Public/Search/${inputElem.value}`);
      this.showSearchResults = false;
    }
  }

  onSearchResultClick(result: string) {
    const inputElem = document.getElementById('Input') as HTMLInputElement;
    if (inputElem) {
      inputElem.value = result;
    }
    this._Navigation.NavigationByUrl(`Public/Search/${result}`);
    this.showSearchResults = false;
  }

  getUserData() {
    if (!this.userid) return;
    this._UserQuereisService.GetUserServices(this.userid).subscribe({
      next: (res) => {
        this.user = res.data;
        this.sharedDataService.updatesuer(this.user);
        this.sharedDataService.currentCUser.subscribe((user) => {
          this.user = user;
        });
      },
    });
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    location.reload();
  }

  GetCart() {
    this._Navigation.NavigationByUrl(`Security/Cart`);
  }
  IsAuth(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
