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

  getRecipesPaginated(page: number, perPage: number, Keywords: string = null): Observable<Array<Recipe>> {
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

  postRecipes(recipe: Recipe){
    console.log('post: '+ JSON.stringify(recipe));
    let headers = new Headers();
    headers.append('Authorization', this.tockenStorage.getToken());
    headers.append('Content-Type', 'application/json');
    this.http.post<Recipe>(this.endpoint , recipe , httpOptions).subscribe(
      (response) => {
        this.communicationService.filter('refresh');
        this.openSnackBar('Ajout de la recette aved succée', recipe.name);
       // this.communicationService.filter('refresh');
      },
      response => {
        this.communicationService.filter('refresh');
      }
    );
  }

  updateRecipe(recipe: Recipe) {
    this.http.post<Recipe>(this.endpoint + '/' + recipe._id, recipe, httpOptions).subscribe(
      (response) => {
        this.openSnackBar('Mise à jour terminée', recipe.name);
      //  this.communicationService.filter('refresh');

      },
      response => {
        this.openSnackBar('Erreur lors de la mise à jour de la rectte', recipe.name);
      }
    );
  }

  private extractData(body: any) {
    return body || [];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
