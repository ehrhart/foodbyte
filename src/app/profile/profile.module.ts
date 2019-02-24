import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ]
})
export class ProfileModule { }
