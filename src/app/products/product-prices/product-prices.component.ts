import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {PricesService} from "../../service/api/prices.service";
import {Price} from "../../Models/Price";
import {ShopsService} from "../../service/api/shops.service";
import {Shop} from "../../Models/Shop";
import {CommunicationService} from "../../service/communication.service";
import {FormControl} from "@angular/forms";
import {ProductsService} from "../../service/api/products.service";

@Component({
  selector: 'app-product-prices',
  templateUrl: './product-prices.component.html',
  styleUrls: ['./product-prices.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ProductPricesComponent implements OnInit {


  public productPrices: Price[] = [];
  public allShops: Shop[] = [];
  price = new FormControl();
  showEditForm: boolean = false;


  constructor(public dialogRef: MatDialogRef<ProductPricesComponent>,
              private pricesService: PricesService,
              private communicationService: CommunicationService,
              private shopService: ShopsService,
              private productService: ProductsService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.communicationService.listen().subscribe((m: any) => {
      this.onFilterClick(m);
    });
  }

  ngOnInit() {

    this.getShops();
    this.pricesService.getPrices().subscribe(prices => {
      this.productPrices = prices.filter(e => e.productId === this.data.product._id)
    });

    this.dialogRef.afterClosed().subscribe(dialogResult => {

      if (!dialogResult || dialogResult[0] !== 'confirm-details') {
        return;
      }
    });

  }

  public onNoClick(): void {
    this.dialogRef.close(['cancel-details']);
  }

  filterShop(id: number) {
    return this.allShops.find(e => e._id === id);
  }

  public getShops() {
    this.allShops = [];
    this.shopService.getShopsPaginated(0, 1000).subscribe(shops => {
      for (let shop of shops) {
        this.allShops.push(shop);
      }
    });
  }

  public removePrice(id: number) {
    this.pricesService.remove(id);
  }

  public editPrice() {
    this.showEditForm = true;
  }

  public confirmEditPrice(id : number , shop: Shop) {
    this.productService.editProductPrice(this.data.product._id ,id, this.price.value , shop);
    this.showEditForm = false;
  }

  onFilterClick(event) {
    if (event === 'refreshPrices') {
      this.pricesService.getPrices().subscribe(prices => {
        this.productPrices = prices.filter(e => e.productId === this.data.product._id)
      });
    }
  }

}
