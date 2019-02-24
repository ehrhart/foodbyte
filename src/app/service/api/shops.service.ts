import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatSnackBar} from "@angular/material";
import {handleError} from "./api-services.utils";
import {Shop} from "../../Models/Shop";

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  endpoint = '/api/shops';
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

  private extratTotalPage(res: any) {
    let body = res;
    return body.totalPages || [];
  }

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  getTotalPage(): Observable<number> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint, options)
    .map(this.extratTotalPage)
    .catch(handleError);
  }

  getShopsPaginated(page: number, perPage: number, Keywords: string = null): Observable<Array<Shop>> {
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



}

