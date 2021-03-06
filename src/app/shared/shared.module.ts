import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatToolbarModule,
  MatMenuModule,
  MatTabsModule,
  MatDividerModule,
  MatCardModule,
  MatListModule,
  MatExpansionModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatInputModule,
  MatSnackBarModule,
  MatSidenavModule,
  MatTreeModule,
  MatProgressBarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatGridListModule,
  MatGridTile,
  MatButtonToggleModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatPaginatorModule, MatProgressSpinnerModule,
  MatDatepickerModule, DateAdapter, NativeDateAdapter, MatNativeDateModule
} from '@angular/material';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ProductsService} from "../service/api/products.service";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatTreeModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDatepickerModule

  ],
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatTabsModule,
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatTreeModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    FlexLayoutModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatDatepickerModule

  ],

  declarations: [],
})
export class SharedModule { }
