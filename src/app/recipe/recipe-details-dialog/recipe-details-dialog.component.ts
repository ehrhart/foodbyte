import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-recipe-details-dialog',
  templateUrl: './recipe-details-dialog.component.html',
  styleUrls: ['./recipe-details-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class RecipeDetailsDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecipeDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    this.dialogRef.afterClosed().subscribe(dialogResult => {

      if ( !dialogResult  || dialogResult[0] !== 'confirm-details' ){
        return;
      }
    });

  }

  onNoClick(): void {
    this.dialogRef.close(['cancel-details']);
  }

}
