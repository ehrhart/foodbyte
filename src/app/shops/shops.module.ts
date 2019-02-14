import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsComponent } from './shops/shops.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [ShopsComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class ShopsModule { }
