import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsComponent} from './products/products.component';
import {SharedModule} from "../shared/shared.module";
import {ProductsService} from "../service/api/products.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import { ProductDetailsDialogComponent } from './product-details-dialog/product-details-dialog.component';
import { AddProductsDetailsComponent } from './add-products-details/add-products-details.component';
import { ProductStatComponent } from './product-stat/product-stat.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {MatDatepickerModule, MatNativeDateModule} from "@angular/material";

@NgModule({
  declarations: [ProductsComponent, ProductDetailsDialogComponent, AddProductsDetailsComponent, ProductStatComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgxChartsModule
  ],
  providers: [ProductsService, MatNativeDateModule],
  entryComponents: [
    ProductDetailsDialogComponent,
    AddProductsDetailsComponent,
    ProductStatComponent
  ],
  
})
export class ProductsModule {
}
