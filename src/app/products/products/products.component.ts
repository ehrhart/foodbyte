
import { Component, OnInit,ViewChild,AfterViewInit } from '@angular/core';
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



export class ProductsComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  products: any = [];
  pageId = 1;
  pagedItems: any[] = [];
  allItems: any[] = [];
  actualPage: number = 1;
  defaultPageSize: number = 8;
  ascendantNameSort: boolean = true;
  ascendantPriceSort: boolean = true;
  totalpage:number =0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(public productsService: ProductsService, private route: ActivatedRoute,
    private router: Router, public dialog: MatDialog, private formBuilder: FormBuilder, ) {
     }

  ngOnInit() {
    this.productsService.getTotalPage().subscribe(totalPage => {
      this.totalpage=totalPage;
    });

  }
  ngAfterViewInit() {
    this.getProducts();
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const valueToAddToTotalPages = length % pageSize > 0 ? 1 : 0;
      return length + ' entrée(s) - Page ' + (page + 1) + ' sur ' + Math.min(1, (Math.trunc(length / pageSize) + valueToAddToTotalPages));
    };
    this.paginator._intl.itemsPerPageLabel = 'Entrées par page :';
    this.paginator.page.subscribe(() => {
      this.getProducts();
    });
  }


  public getProducts() {
    this.pagedItems = [];
    this.productsService.getProductsPaginated(this.paginator.pageIndex, this.paginator.pageSize).subscribe(products => {
      for (let product of products) {
        this.pagedItems.push(product);
      }
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

  

  filterProductName() {
    console.log(this.products)
    this.ascendantNameSort = !this.ascendantNameSort;
    if (this.ascendantNameSort) {
      this.pagedItems = this.pagedItems.sort(function (a, b) {

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
      this.pagedItems = this.pagedItems.sort(function (a, b) {
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
      this.pagedItems = this.pagedItems.sort(function (a, b) {

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
      this.pagedItems = this.pagedItems.sort(function (a, b) {
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
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

}
