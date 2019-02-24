import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShopsComponent} from './shops/shops.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ShopsService} from "../service/api/shops.service";
import {SharedModule} from "../shared/shared.module";
import {BrowserModule} from "@angular/platform-browser";
import {ShopGeolocalisationComponent} from './shop-geolocalisation/shop-geolocalisation.component';
import {ShopDetailComponent} from './shop-detail/shop-detail.component';
import {AgmCoreModule} from "@agm/core";


@NgModule({
  declarations: [ShopsComponent, ShopGeolocalisationComponent, ShopDetailComponent],
  providers: [ShopsService],
  entryComponents: [
    ShopDetailComponent,
    ShopGeolocalisationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    AgmCoreModule
  ]
})
export class ShopsModule { }
