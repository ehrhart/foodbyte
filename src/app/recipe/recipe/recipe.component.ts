import {Component, OnInit, VERSION, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {recipeMock} from "./fake-recipe.mock";
import {Recipe} from "../../Models/Recipe";
import {RecipesService} from "../../service/api/recipes.services";
import {MatDialog} from "@angular/material";
import {RecipeDetailsDialogComponent} from "../recipe-details-dialog/recipe-details-dialog.component";
import {AddDialogComponent} from "../add-dialog/add-dialog.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommunicationService} from "../../service/communication.service";
import {PagerService} from "../../service/pager.service";
import {RecipeCommentComponent} from "../recipe-comment/recipe-comment.component";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecipeComponent implements OnInit {

  public form: FormGroup;
  recipes: Array<Recipe> = [];
  rows: number[];
  ElementNumber: number;
  innerWidth: number;
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;
  ascendantCreationSort: boolean = true;
  ascendantUpdateSort: boolean = true;
  ascendantAlphabetciSort: boolean = true;
  allItems: any[] = [];
  pager: any = {};
  pagedItems: any[] = [];
  recipeSearch = new FormControl();


  constructor(private recipeService: RecipesService,
              public dialog: MatDialog,
              private formBuilder: FormBuilder,
              private communicationService: CommunicationService,
              private pagerService: PagerService
  ) {
    this.communicationService.listen().subscribe((m: any) => {
      this.onFilterClick(m);
    });

  }

  ngOnInit() {
    this.getRecipes();
    this.ascendantCreationSort = true;
    this.filterCreationDate();
    console.log(this.allItems);
  }
/**/
  onFilterClick(event) {
    if (event === 'refresh') {
      this.getRecipes();
      this.ascendantCreationSort = false;
      this.filterCreationDate();
    }
  }


  public openRecipeDetailDialog(recipe: Recipe) {
    this.dialog.open(RecipeDetailsDialogComponent, {
      width: '1000px',
      height: '800px',
      data: {recipe: recipe}
    });
  }

  public openRecipeCommentDialog(recipe: Recipe) {
    this.dialog.open(RecipeCommentComponent, {
      width: '1000px',
      height: '800px',
      data: {recipe: recipe, form: this.genrateCommentForm}
    });
  }

  public openAddRecipeDialog() {
    this.dialog.open(AddDialogComponent, {
      width: '1000px',
      height: '800px',
      data: {form: this.generateRecipeForm()}
    })
  }


  public getRecipes() {
    this.recipeService.getRecipes().subscribe(recipes => {
      console.log(recipes);
      for (let recipe of recipes) {
        this.recipes.push(recipe as Recipe);
        this.allItems.push(recipe);
      }
      this.setPage(1);
    });
  }

   public filterCreationDate() {
     this.ascendantCreationSort = !this.ascendantCreationSort;
     if(this.ascendantCreationSort) {
      this.pagedItems = this.pagedItems.sort((a: Recipe, b: Recipe) => {
        console.log("acendant sort");
        let date1 = new Date(a.createdAt);
        let date2 = new Date(b.createdAt);
        return date1.getTime() - date2.getTime();

      });
    }
    else{
      this.pagedItems = this.pagedItems.sort((a: Recipe, b: Recipe) => {
        console.log("descendant sort")
        let date1 = new Date(a.createdAt);
        let date2 = new Date(b.createdAt);
        return date2.getTime() - date1.getTime();

      });
    }
  }

  public filterUpdateDate() {
    this.ascendantUpdateSort = !this.ascendantUpdateSort;
    if(this.ascendantUpdateSort) {
      this.pagedItems = this.pagedItems.sort((a: Recipe, b: Recipe) => {
        console.log("acendant sort");
        let date1 = new Date(a.updatedAt);
        let date2 = new Date(b.updatedAt);
        return date1.getTime() - date2.getTime();

      });
    }
    else{
      this.pagedItems = this.pagedItems.sort((a: Recipe, b: Recipe) => {
        console.log("descendant sort")
        let date1 = new Date(a.updatedAt);
        let date2 = new Date(b.updatedAt);
        return date2.getTime() - date1.getTime();

      });
    }
  }
  filterAlphabeticName() {
    this.ascendantAlphabetciSort = !this.ascendantAlphabetciSort;
    if(this.ascendantAlphabetciSort) {
      this.pagedItems = this.pagedItems.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    }
    else {
      this.pagedItems = this.pagedItems.sort(function (a, b) {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      })
    }
  }

  public generateRecipeForm(): FormGroup {
    return this.formBuilder.group({
      _id: [],
      name: [''],
      createdAt: [''],
      updatedAt: [],
      user: [],
      ingredients: [''],
      desciption: ['']
    })
  }

  public genrateCommentForm(): FormGroup {
    return this.formBuilder.group({
      _id: [],
      content: [''],
    })
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
