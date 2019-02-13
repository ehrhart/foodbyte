import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import {SharedModule} from "../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule
  ]
})
export class ProductsModule { }
