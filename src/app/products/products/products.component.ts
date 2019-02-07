import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../service/products.service'
import { ActivatedRoute, Router } from '@angular/router';

export interface ProductFeature {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']

})

export class ProductsComponent implements OnInit {
  products:any = [];
  featureSelect: ProductFeature[] = [
    {value: 'price-0', viewValue: 'price'},
    {value: 'Store-1', viewValue: 'Store'},
    {value: 'NutrionalValue-2', viewValue: 'Nutrional Value'}
  ];
  constructor(public rest:ProductsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products = [];
    this.rest.getProducts().subscribe((data: {}) => {
      console.log(data);
      this.products = data;
    });
  }
}
