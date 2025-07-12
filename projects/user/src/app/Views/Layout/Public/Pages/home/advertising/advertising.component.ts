import { Component } from '@angular/core';
import { SharedModuleModule } from '../../../../../../Shared/Modules/shared-module.module';

@Component({
  selector: 'app-advertising',
  imports: [SharedModuleModule],
  templateUrl: './advertising.component.html',
  styleUrl: './advertising.component.css',
})
export class AdvertisingComponent {
  loading: boolean = true;
  // إعدادات الهيكل لكل نوع
  smallSkeletonTheme = {
    width: '100%',
    height: '200px',
    'border-radius': '4px',
  };

  largeSkeletonTheme = {
    width: '100%',
    height: '400px',
    'border-radius': '4px',
  };

  tallSkeletonTheme = {
    width: '100%',
    height: '400px',
    'border-radius': '4px',
  };

  constructor() {
    // Simulate loading delay
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
