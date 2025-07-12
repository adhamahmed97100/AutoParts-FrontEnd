import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyLoadImageModule } from 'ng-lazyload-image';
const Modules = [CommonModule, LazyLoadImageModule];

@NgModule({
  declarations: [],
  imports: [Modules],
  exports: [...Modules],
})
export class SharedModuleModule {}
