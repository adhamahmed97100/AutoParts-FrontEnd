import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserQuereisService } from '../../../../Services/User/Queries/Handler/user-quereis.service';
import { GetUserIdModel } from '../../../../Services/User/Queries/Models/GetUserIdModels';
import { Response } from '../../../../Core/BasicResponse/Response';
import { ScrollService } from '../../../../Services/scroll.service';
import { SharedModuleModule } from '../../../../Shared/Modules/shared-module.module';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterModule, SharedModuleModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userData: GetUserIdModel = {} as GetUserIdModel;
  userPhoto: string | null = '';
  userId: string = localStorage.getItem('userId') || '';

  constructor(private userService: UserQuereisService) {}
  private scrollService = inject(ScrollService);

  ngOnInit(): void {
    setTimeout(() => {
      this.scrollService.smoothScroll(1000);
    }, 100);
    if (this.userId) {
      this.loadUserData();
    } else {
      console.error('User ID not found');
    }
  }

  loadUserData(): void {
    this.userService
      .GetUserServices(this.userId)
      .subscribe((response: Response<GetUserIdModel>) => {
        this.userData = response.data;
        console.log('User data loaded:', this.userData);
        if (this.userData?.picture) {
          this.userPhoto = this.userData.picture;
        }
      });
  }
}
