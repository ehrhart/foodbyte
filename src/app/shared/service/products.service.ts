import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
   endpoint = 'http://localhost:/api/';
   httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};
private extractData(res: Response) {
  let body = res;
  return body || { };
}

  constructor(private http: HttpClient) { }
  getProducts(pageID): Observable<any> {
    return this.http.get(this.endpoint + 'products?page='+pageID).pipe(
      map(this.extractData));
  }
  
  getProduct(id): Observable<any> {
    return this.http.get(this.endpoint + 'products/' + id).pipe(
      map(this.extractData));
  }
  updateProduct (id, product): Observable<any> {
    return this.http.put(this.endpoint + 'products/' + id, JSON.stringify(product), this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`))
    );
  }


}

