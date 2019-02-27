import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator} from "@angular/material";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {ShopsService} from "../../service/api/shops.service";
import {Recipe} from "../../Models/Recipe";
import {RecipeCommentComponent} from "../../recipe/recipe-comment/recipe-comment.component";
import {AddDialogComponent} from "../../recipe/add-dialog/add-dialog.component";
import {Shop} from "../../Models/Shop";
import {ShopDetailComponent} from "../shop-detail/shop-detail.component";
import {ShopGeolocalisationComponent} from "../shop-geolocalisation/shop-geolocalisation.component";

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  shops: any = [];
  pagedItems: any[] = [];
  actualPage: number = 1;
  defaultPageSize: number = 8;
  ascendantNameSort: boolean = true;
  ascendantPriceSort: boolean = true;
  totalpage:number =0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  constructor(public shopsService: ShopsService, private route: ActivatedRoute,
              private router: Router, public dialog: MatDialog, private formBuilder: FormBuilder,) {
  }

  ngOnInit() {
    this.shopsService.getTotalPage().subscribe(totalPage => {
      this.totalpage = totalPage;
    });

  }

  ngAfterViewInit() {
    this.getShops();
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const valueToAddToTotalPages = length % pageSize > 0 ? 1 : 0;
      return length + ' entrée(s) - Page ' + (page + 1) + ' sur ' + Math.min(1, (Math.trunc(length / pageSize) + valueToAddToTotalPages));
    };
    this.paginator._intl.itemsPerPageLabel = 'Entrées par page :';
    this.paginator.page.subscribe(() => {
      this.getShops();
    });
  }

  public openShopAdressDialog(shop: Shop) {
    this.dialog.open(ShopDetailComponent, {
      width: '80%',
      data: {shop: shop}
    });
  }

  public openShopGeolocalisationDialog(shop: Shop) {
    this.dialog.open(ShopGeolocalisationComponent, {
      width: '80%',
      data: {shop: shop}
    })
  }


  public getShops() {
    this.pagedItems = [];
    this.shopsService.getShopsPaginated(this.paginator.pageIndex, this.paginator.pageSize).subscribe(shops => {
      for (let shop of shops) {
        this.pagedItems.push(shop);
      }
    });
  }


}
