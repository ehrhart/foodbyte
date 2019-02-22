import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material";
import {Recipe} from "../../Models/Recipe";
import {handleError} from "./api-services.utils";
import {Ingridient} from "../../Models/Ingridient";
import { Product } from '../../Models/Product';

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

  private extractData(res: any) {
    let body = res;
    return body.results || {};
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

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  getTotalPage(): Observable<number> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint, options)
      .map(this.extratTotalPage)
      .catch(handleError);
  }

  getProductsPaginated(page: number, perPage: number, Keywords: string = null): Observable<Array<Recipe>> {
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


  getProducts(): Observable<Array<Product>> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint, options)
      .map(this.extractData)
      .catch(handleError);
  }

  updateProduct(id, product): Observable<any> {
    return this.http.put(this.endpoint + 'products/' + id, JSON.stringify(product), this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`))
    );
  }


}

