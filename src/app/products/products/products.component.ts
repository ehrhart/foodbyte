import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {ProductsService} from '../../service/api/products.service'
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Observable} from 'rxjs';
import {MatDialog, MatPaginator} from "@angular/material";
import {Product} from '../../Models/Product';
import {ProductDetailsDialogComponent} from '../product-details-dialog/product-details-dialog.component';
import {AddProductsDetailsComponent} from '../add-products-details/add-products-details.component';
import {ProductStatComponent} from "../product-stat/product-stat.component";
import {CommunicationService} from "../../service/communication.service";
import {ProductPricesComponent} from "../product-prices/product-prices.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']

})


export class ProductsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  products: any = [];
  pagedItems: any[] = [];
  actualPage: number = 1;
  defaultPageSize: number = 8;
  ascendantNameSort: boolean = true;
  ascendantPriceSort: boolean = true;
  totalpage: number = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  unFiltredpagedItems: any[] = [];

  productSearch = new FormControl();

  constructor(public productsService: ProductsService, private route: ActivatedRoute, private communicationService: CommunicationService,
              private router: Router, public dialog: MatDialog, private formBuilder: FormBuilder,) {
    this.communicationService.listen().subscribe((m: any) => {
      this.onFilterClick(m);
    });
  }

  ngOnInit() {
    this.productsService.getTotalPage().subscribe(totalPage => {
      this.totalpage = totalPage;
    });
     console.log(this.totalpage);
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
        this.unFiltredpagedItems.push(product);

      }
    });
  }

  addProductDialog(product: Product) {
    this.dialog.open(AddProductsDetailsComponent, {
      width: '80%',
      data: {product: product, form: this.genrateProductForm()}
    });
  }

  addProductPrices(product: Product) {
    this.dialog.open(ProductPricesComponent, {
      width: '80%',
      data: {product: product}
    });
  }

  public openProductDetailDialog(product: Product) {
    this.dialog.open(ProductDetailsDialogComponent, {
      width: '80%',
      data: {product: product}
    });
  }

  public openProductStatDialog(product: Product) {
    this.dialog.open(ProductStatComponent, {
      width: '80%',
      data: {product: product}
    });
  }


  filterProductName() {
    console.log(this.products);
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
    } else {
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
    } else {
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
      price: [''],
      shop: [''],
      date: [''],
    })
  }

  onFilterClick(event) {
    if (event === 'refreshProducts') {
      this.getProducts();
    }
  }

  public searchProduct() {
    this.pagedItems = [];
    console.log(this.productSearch.value);
    this.productsService.getProductsPaginated(this.paginator.pageIndex, this.paginator.pageSize, this.productSearch.value).subscribe(products => {
      this.pagedItems = [];
      for (let product of products) {
        this.pagedItems.push(product);
      }
    });
  }


}
