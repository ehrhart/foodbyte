import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
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
import {Comment} from "../../Models/Comment";


@Injectable()
export class CommentsService {
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

  getRecipeComments(recipe:Recipe): Observable<Array<Comment>> {
    const options = {headers: this.headers};
    return this.http.get(this.endpoint+'/'+recipe._id+'/comments', options)
    .map(this.extractData)
    .catch(handleError);
  }



  postCommentToRecipe(recipe: Recipe, comment: Comment){
    let headers = new Headers();
    headers.append('Authorization', this.tockenStorage.getToken());
    headers.append('Content-Type', 'application/json');
    this.http.post<Recipe>(this.endpoint+'/'+recipe._id+'/comments' , comment , httpOptions).subscribe(
      (response) => {
        this.communicationService.filter('refreshComments');
        this.openSnackBar('Ajout du commentaire aved succée au recette', recipe.name);
      },
      response => {
        this.openSnackBar('Erreur lors de l ajout du commentaire au rectte', recipe.name);
      }
    );
  }

  updateCommentOfRecipe(recipe: Recipe, comment: Comment) {
    this.http.put<Recipe>(this.endpoint+'/'+recipe._id+'/comments' , comment , httpOptions).subscribe(
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
    return body.comments || [];
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }


}
