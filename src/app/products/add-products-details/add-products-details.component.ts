import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ProductsService} from '../../service/api/products.service';
import {FormControl} from "@angular/forms";
import {Product} from '../../Models/Product';
import {CommunicationService} from "../../service/communication.service";
import {ShopsService} from "../../service/api/shops.service";

@Component({
  selector: 'app-add-products-details',
  templateUrl: './add-products-details.component.html',
  styleUrls: ['./add-products-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddProductsDetailsComponent implements OnInit {

  shops: any = [];
  pagedItems: any[] = [];
  actualPage: number = 1;
  defaultPageSize: number = 8;
  totalpage:number =0;

  constructor(public dialogRef: MatDialogRef<AddProductsDetailsComponent>,
              private productService: ProductsService,
              public shopsService: ShopsService,
              private communicationService: CommunicationService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.communicationService.listen().subscribe((m: any) => {

    });
  }

  ngOnInit() {
    this.shopsService.getTotalPage().subscribe(totalPage => {
      this.totalpage = totalPage;
    });
    this.getShops();
  }

  get price(): FormControl {
    return this.data.form.controls.price as FormControl;
  }

  get shop(): FormControl {
    return this.data.form.controls.shop as FormControl;
  }

  get date(): FormControl {
    return this.data.form.controls.date as FormControl;
  }

  public onNoClick(): void {
    this.dialogRef.close(['cancel-comment']);
  }

  public getShops() {
    this.pagedItems = [];
    this.shopsService.getShopsPaginated(1, this.totalpage).subscribe(shops => {
      for (let shop of shops) {
        this.pagedItems.push(shop);
      }
    });
  }

  public addPrices() {
    const formData = this.data.form.getRawValue();
    this.productService.editProductPrices(formData['price'], formData['shop'], formData['date'], this.data.product._id);
    this.onNoClick();
  }

}
