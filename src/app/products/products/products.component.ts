import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/api/products.service'
import { ActivatedRoute, Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']

})

export class ProductsComponent implements OnInit {
  products:any = [];
  pageId=1;
  ascendantNameSort: boolean = true;
  ascendantPriceSort: boolean = true;
  constructor(public rest:ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    this.getProducts(this.pageId);
  }

  getProducts(pageID) {
    this.products = [];
    this.rest.getProducts(pageID).subscribe((data: {}) => {
      this.products = data;
  
    });
  }

  incPage() {
    
    if(this.pageId<150)
      this.getProducts(++this.pageId);
      

  }
  decPage() {
  
    if(this.pageId>1)
        this.getProducts(--this.pageId);
  
    }

  setPage(x: number){
    this.pageId=x;
        this.getProducts(this.pageId);
  }  

  filterProductName() {
    console.log( this.products)
    this.ascendantNameSort = !this.ascendantNameSort;
    if(this.ascendantNameSort) {
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
    if(this.ascendantPriceSort) {
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



}
