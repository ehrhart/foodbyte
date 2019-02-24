import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material";
import {Recipe} from "../../Models/Recipe";
import {handleError} from "./api-services.utils";
import {Ingridient} from "../../Models/Ingridient";
import { Product } from '../../Models/Product';
import {httpOptions} from "./api-http.config";
import {TokenStorage} from "../../auth/token.storage";
import {CommunicationService} from "../communication.service";
import {Price} from "../../Models/Price";
import {Shop} from "../../Models/Shop";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endpoint = '/api/products';
  headers = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  });

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor( private http: HttpClient,
               private snackBar: MatSnackBar,
               private tockenStorage : TokenStorage,
               private communicationService: CommunicationService) {
  }

  private extractData(res: any) {
    let body = res;
    return body.results || {};
  }

  private extractProduct(res: any) {
    let body = res;
    return body || {};
  }

  private extratIngidients(res: any) {
    let body = res.map(e => e.ingredients);
    return body || [];
  }

  private extratTotalPage(res: any) {
    let body = res;
    return body.totalPages || [];
  }

  getIngridents(): Observable<any> {
    return this.http.get(this.endpoint).pipe(
      map(this.extratIngidients));
  }


  getRecipeSpecificProduct(id: number): Observable<Product> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint + "/" + id , options)
    .map(this.extractProduct)
    .catch(handleError);
  }

  getTotalPage(): Observable<number> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint, options)
      .map(this.extratTotalPage)
      .catch(handleError);
  }

  getProductsPaginated(page: number, perPage: number, Keywords: string = null): Observable<Array<Recipe>> {
    if(Keywords == null) {
      let httpParams: HttpParams = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
      .set('Keywords', Keywords);
      return this.http.get(this.endpoint,  {
        headers: this.headers,
        params: httpParams
      })
      .map(this.extractData)
      .catch(handleError);
    }
    else {
      let httpParams: HttpParams = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
      .set('name', Keywords);
      return this.http.get(this.endpoint,  {
        headers: this.headers,
        params: httpParams
      })
      .map(this.extractData)
      .catch(handleError);
    }
  }


  getProducts(): Observable<Array<Product>> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint, options)
      .map(this.extractData)
      .catch(handleError);
  }

  editProductPrices(price: string , shop: string , date: string , id: number){
    let headers = new Headers();
    headers.append('Authorization', this.tockenStorage.getToken());
    headers.append('Content-Type', 'application/json');
    let body = {
          'shop': shop,
          'price': parseFloat(price),
          'date': new Date().toDateString()
        };
    this.http.post<Price>(this.endpoint + '/'+ id + '/price' , body , httpOptions).subscribe(
      (response) => {
        this.communicationService.filter('refreshRecipes');
        this.openSnackBar('Ajout de la recette aved succée', price);
        // this.communicationService.filter('refresh');
      },
      response => {
        this.communicationService.filter('refreshRecipes');
      }
    );
  }

  editProductPrice(productId: number, priceId: number , price: string , shopId: Shop) {
    let headers = new Headers();
    headers.append('Authorization', this.tockenStorage.getToken());
    headers.append('Content-Type', 'application/json');
    let body = {
      'shop': shopId._id,
      'price': parseFloat(price),
      'date': new Date().toDateString()
    };
    return this.http.put<Price>(this.endpoint +'/'+productId +'/price/'+ priceId, body, httpOptions).subscribe(
      (response) => {
        this.communicationService.filter('refreshPrices');
        this.openSnackBar('Mise à jour du prix aved succée', 'succée');
      },
      response => {
        this.communicationService.filter('refreshPrices');
      }
    );
  }

  updateProduct(id, product): Observable<any> {
    return this.http.put(this.endpoint + 'products/' + id, JSON.stringify(product), this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`))
    );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }


}

