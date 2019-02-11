import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map, catchError, tap} from 'rxjs/operators';
import {MatSnackBar} from "@angular/material";
import {Recipe} from "../../Models/Recipe";
import {handleError} from "./api-services.utils";
import {Ingridient} from "../../Models/Ingridient";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endpoint = 'http://localhost:4040/api/';
  headers = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  });

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private extratIngidients(res: any) {
    let body = res.map(e => e.ingredients);
    console.log(body);
    return body || [];
  }

  getIngridents(): Observable<any> {
    return this.http.get(this.endpoint + 'products').pipe(
      map(this.extratIngidients));
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  getProducts(): Observable<any> {
    return this.http.get(this.endpoint + 'products').pipe(
      map(this.extractData));
  }

  getProduct(id): Observable<any> {
    return this.http.get(this.endpoint + 'products/' + id).pipe(
      map(this.extractData));
  }

  updateProduct(id, product): Observable<any> {
    return this.http.put(this.endpoint + 'products/' + id, JSON.stringify(product), this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`))
    );
  }


}

