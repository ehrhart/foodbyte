
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/api/products.service'
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable } from 'rxjs';
import { MatDialog, MatPaginator } from "@angular/material";
import { Product } from '../../Models/Product';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import { AddProductsDetailsComponent } from '../add-products-details/add-products-details.component';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']

})

export class ProductsComponent implements OnInit {
  products: any = [];
  pageId = 1;
  ascendantNameSort: boolean = true;
  ascendantPriceSort: boolean = true;
  constructor(public rest: ProductsService, private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog, private formBuilder: FormBuilder, ) { }

  ngOnInit() {

    this.getProducts(this.pageId);
  }

  getProducts(pageID) {
    this.products = [];
    this.rest.getProducts(pageID).subscribe((data: {}) => {
      this.products = data;

    });
  }
  addProductDialog(product: Product) {
    this.dialog.open(AddProductsDetailsComponent, {
      width: '500px',
      height: '400px',
      data: { product: product,form: this.genrateProductForm }
    });

  }

  public openProductDetailDialog(product: Product) {
    this.dialog.open(ProductDetailsDialogComponent, {
      width: '1000px',
      height: '800px',
      data: { product: product }
    });
  }

  incPage() {

    if (this.pageId < 150)
      this.getProducts(++this.pageId);


  }
  decPage() {

    if (this.pageId > 1)
      this.getProducts(--this.pageId);

  }

  setPage(x: number) {
    this.pageId = x;
    this.getProducts(this.pageId);
  }

  filterProductName() {
    console.log(this.products)
    this.ascendantNameSort = !this.ascendantNameSort;
    if (this.ascendantNameSort) {
      this.products = this.products.sort(function (a, b) {

        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    }
    else {
      this.products = this.products.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      })
    }
  }


  filterProductPrice() {
    this.ascendantPriceSort = !this.ascendantPriceSort;
    if (this.ascendantPriceSort) {
      this.products = this.products.sort(function (a, b) {

        if (a.prices < b.prices) {
          return -1;
        }
        if (a.prices > b.prices) {
          return 1;
        }
        return 0;
      })
    }
    else {
      this.products = this.products.sort(function (a, b) {
        if (a.prices > b.prices) {
          return -1;
        }
        if (a.prices < b.prices) {
          return 1;
        }
        return 0;
      })
    }
  }
  public genrateProductForm(): FormGroup {
    return this.formBuilder.group({
      _id: [],
      prices: [],
      shop:[''],
      entry_date:[''],
    })
  }


}
