import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import {SharedModule} from "../shared/shared.module";
import {ProductsService} from "../service/api/products.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { ProductDetailsDialogComponent } from './product-details-dialog/product-details-dialog.component';
import { AddProductsDetailsComponent } from './add-products-details/add-products-details.component';

@NgModule({
  declarations: [ProductsComponent, ProductDetailsDialogComponent, AddProductsDetailsComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
  ],
  providers: [ProductsService],
  entryComponents: [
    ProductDetailsDialogComponent,
    AddProductsDetailsComponent,
  ],
  
})
export class ProductsModule { }
