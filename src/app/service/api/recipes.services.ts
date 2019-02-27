import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import {Recipe} from "../../Models/Recipe";
import {MatSnackBar} from "@angular/material";
import {httpOptions} from "./api-http.config";
import {handleError} from "./api-services.utils";
import {TokenStorage} from "../../auth/token.storage";
import {CommunicationService} from "../communication.service";
import {Product} from "../../Models/Product";


@Injectable()
export class RecipesService {
  headers = new HttpHeaders({
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  });
  private endpoint = '/api/recipes';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private tockenStorage : TokenStorage,
    private communicationService: CommunicationService
  ) {
  }

  getRecipes(): Observable<Array<Recipe>> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint, options)
      .map(this.extractData)
      .catch(handleError);
  }

  getRecipeProducts(id: number): Observable<Array<Product>> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint + "/" + id + "/products", options)
    .map(this.extractData)
    .catch(handleError);
  }

  private extratTotalPage(res: any) {
    let body = res;
    return body.totalPages || [];
  }

  private extratTotalElementNumber(res: any) {
    let body = res;
    return body.totalResults || [];
  }

  getTotalPage(): Observable<number> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint, options)
      .map(this.extratTotalPage)
      .catch(handleError);
  }

  getTotalElementNumber(): Observable<number> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint, options)
    .map(this.extratTotalElementNumber)
    .catch(handleError);
  }

  getRecipesPaginated(page: number, perPage: number, Keywords: string = null): Observable<Array<Recipe>> {
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
      .set('q', Keywords);
      return this.http.get(this.endpoint,  {
        headers: this.headers,
        params: httpParams
      })
      .map(this.extractData)
      .catch(handleError);
    }
  }

  postRecipes(recipe: Recipe){
    console.log('post: '+ JSON.stringify(recipe));
    let headers = new Headers();
    headers.append('Authorization', this.tockenStorage.getToken());
    headers.append('Content-Type', 'application/json');
    this.http.post<Recipe>(this.endpoint , recipe , httpOptions).subscribe(
      (response) => {
        this.communicationService.filter('refreshRecipes');
        this.openSnackBar('Recette ajoutée avec succès', recipe.name);
       // this.communicationService.filter('refresh');
      },
      response => {
        this.communicationService.filter('refreshRecipes');
      }
    );
  }

  editRecipes(recipe: Recipe){
    console.log('edit: '+ JSON.stringify(recipe));
    let headers = new Headers();
    headers.append('Authorization', this.tockenStorage.getToken());
    headers.append('Content-Type', 'application/json');

    let body = {
      name: recipe.name,
      text: recipe.text
    };
    this.http.put<Recipe>(this.endpoint + '/'+ recipe._id , body , httpOptions).subscribe(
      (response) => {
        this.communicationService.filter('refreshRecipes');
        this.openSnackBar('Recette mise à jour avec succès', recipe.name);
      },
      response => {
        this.communicationService.filter('refreshRecipes');
      }
    );
  }


  rateRecipe(id: number, rating: number){
    let headers = new Headers();
    headers.append('Authorization', this.tockenStorage.getToken());
    headers.append('Content-Type', 'application/json');

    let httpParams: HttpParams = new HttpParams()
    .set('rating', rating.toString())


    let body = {
      rating: rating,
    };
    this.http.put<Recipe>(this.endpoint + '/'+ id +'/ratings/'+rating , {
      headers: this.headers,
      params: httpParams
    }).subscribe(
      (response) => {
        this.communicationService.filter('refreshRecipes');
        this.openSnackBar('Évaluation ajoutée avec succès', 'succès');
      },
      response => {
        this.communicationService.filter('refreshRecipes');
      }
    );
  }


  private extractData(body: any) {
    return body.results || [];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
}
