import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatSnackBar} from "@angular/material";
import {handleError} from "./api-services.utils";
import {Price} from "../../Models/Price";
import {TokenStorage} from "../../auth/token.storage";
import {CommunicationService} from "../communication.service";

@Injectable({
  providedIn: 'root'
})
export class PricesService {
  endpoint = '/api/prices';
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
    return body || {};
  }

  constructor(private http: HttpClient,
              private snackBar: MatSnackBar,
              private tockenStorage : TokenStorage,
              private communicationService: CommunicationService) {
  }

  getPrices(): Observable<Array<Price>> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint, options)
    .map(this.extractData)
    .catch(handleError);
  }

  remove(id: number) {
    const options = {headers: this.headers};
    return this.http.delete(this.endpoint +'/'+id, options).subscribe(
      (response) => {
        this.communicationService.filter('refreshPrices');
        this.openSnackBar('Suppression du prix avec succès', 'succès');
        // this.communicationService.filter('refresh');
      },
      response => {
        this.communicationService.filter('refreshPrices');
      }
    );
  }



  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

}

