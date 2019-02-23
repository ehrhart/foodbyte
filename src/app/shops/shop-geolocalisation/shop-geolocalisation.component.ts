import {Component, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";


@Component({
  selector: 'app-shop-geolocalisation',
  templateUrl: './shop-geolocalisation.component.html',
  styleUrls: ['./shop-geolocalisation.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class ShopGeolocalisationComponent implements OnInit {

  lat: number = 51.678418;
  lng: number = 7.809007;
  zoom: number = 8;
  label: string = '';
  draggable: false


  constructor(public dialogRef: MatDialogRef<ShopGeolocalisationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit() {
    console.log(this.data.shop);
    this.lng = this.data.shop.location.coordinates[0];
    this.lat = this.data.shop.location.coordinates[1];
    this.label = this.data.shop.name;
    this.dialogRef.afterClosed().subscribe(dialogResult => {

      if (!dialogResult || dialogResult[0] !== 'confirm-details') {
        return;
      }
    });
  }

  public onNoClick(): void {
    this.dialogRef.close(['cancel-details']);
  }

}
