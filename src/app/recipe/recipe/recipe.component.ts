import {Component, OnInit, VERSION, ViewEncapsulation} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {recipeMock} from "./fake-recipe.mock";
import {Recipe} from "../../Models/Recipe";
import {RecipesService} from "../../service/api/recipes.services";
import {MatDialog} from "@angular/material";
import {RecipeDetailsDialogComponent} from "../recipe-details-dialog/recipe-details-dialog.component";
import {AddDialogComponent} from "../add-dialog/add-dialog.component";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class RecipeComponent implements OnInit {

  public form: FormGroup;
  recipes: Array<Recipe> = [];
  rows: number[] ;
  ElementNumber: number;
  innerWidth: number;
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;

  constructor(private recipeService: RecipesService, public dialog: MatDialog) { }

  ngOnInit() {
       this.recipeService.getRecipes().subscribe( recipes => {
         console.log(recipes);
         for (let recipe of recipes) {
           this.recipes.push(recipe as Recipe);
         }
       });


    this.ElementNumber = 3;
    this.rows = Array.from(
      Array(Math.ceil(this.recipes.length / 2)).keys()
    );
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 3;
    this.innerWidth = window.innerWidth;

    console.log(this.recipes);
  }

  public openRecipeDetailDialog(recipe: Recipe) {
    let dialogRef = this.dialog.open(RecipeDetailsDialogComponent, {
      width: '1000px',
      height: '500px',
      data: {recipe: recipe}
    });
  }

  public openAddRecipeDialog() {
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: '1000px',
      height: '500px'
    });
  }



}
