import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ProductsService} from '../../service/api/products.service';
import {FormControl} from "@angular/forms";
import {Product} from '../../Models/Product';
import {CommunicationService} from "../../service/communication.service";

@Component({
  selector: 'app-add-products-details',
  templateUrl: './add-products-details.component.html',
  styleUrls: ['./add-products-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductsDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddProductsDetailsComponent>,
    private productService: ProductsService,
    private communicationService: CommunicationService,
    @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.communicationService.listen().subscribe((m: any) => {

});
}

  ngOnInit() {
    
  }
  public onNoClick(): void {
    this.dialogRef.close(['cancel-comment']);
  }

}
