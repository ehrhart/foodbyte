import { Component, OnInit, Inject,ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

    ngOnInit() {
      this.dialogRef.afterClosed().subscribe(dialogResult => {
  
        if ( !dialogResult  || dialogResult[0] !== 'confirm-details' ){
          return;
        }
      });
  
    }
    public onNoClick(): void {
      this.dialogRef.close(['cancel-details']);
    }

}
