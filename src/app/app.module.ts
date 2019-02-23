import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthModule} from './auth/auth.module';

import {AppComponent} from './app.component';
import {AdminModule} from './admin/admin.module';
import {AuthHeaderInterceptor} from './interceptors/header.interceptor';
import {CatchErrorInterceptor} from './interceptors/http-error.interceptor';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {ProductsModule} from "./products/products.module";
import {RecipeModule} from "./recipe/recipe.module";
import {SharedModule} from "./shared/shared.module";
import {CommunicationService} from "./service/communication.service";
import {PagerService} from "./service/pager.service";
import {ShopsModule} from "./shops/shops.module";
import {AgmCoreModule} from "@agm/core";
import {StatisticsModule} from "./statistics/statistics.module";
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    AuthModule,
    AdminModule,
    AppRoutingModule,
    ProductsModule,
    RecipeModule,
    ShopsModule,
    StatisticsModule,
    NgxChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnrsadGZ5CZ4tNPubPyy4nGUbdre6M_3c'
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: CatchErrorInterceptor,
    multi: true,
  },CommunicationService,PagerService],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
