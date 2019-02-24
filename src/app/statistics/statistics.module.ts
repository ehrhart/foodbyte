import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatDashboardComponent} from './stat-dashboard/stat-dashboard.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {SharedModule} from "../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  declarations: [StatDashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    BrowserAnimationsModule,
    BrowserModule,
    NgxChartsModule
  ]
})
export class StatisticsModule {
}
