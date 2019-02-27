import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Recipe} from "../../Models/Recipe";
import {RecipesService} from "../../service/api/recipes.services";
import {MatDialog, MatPaginator, PageEvent} from "@angular/material";
import {RecipeDetailsDialogComponent} from "../recipe-details-dialog/recipe-details-dialog.component";
import {AddDialogComponent} from "../add-dialog/add-dialog.component";
import {CommunicationService} from "../../service/communication.service";
import {PagerService} from "../../service/pager.service";
import {RecipeCommentComponent} from "../recipe-comment/recipe-comment.component";

import {DpAppAnimations} from 'app/app.animation';
import {RecipeStatComponent} from "../recipe-stat/recipe-stat.component";
import {RecipeEditComponent} from "../recipe-edit/recipe-edit.component";

let animationObj = new DpAppAnimations();

let textAnimStates = animationObj.SetTrigger('heroState');

export const AppAnimations = [].concat(textAnimStates);

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: AppAnimations
})
export class RecipeComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator)
  public paginator: MatPaginator;

  @ViewChild('search')
  public search: ElementRef;

  animState = 'active';

  pageSizeOptions: number[] = [5, 10, 25, 100];

  totalpage: number = 0;

  pageEvent: PageEvent;


  public form: FormGroup;
  recipes: Array<Recipe> = [];
  ascendantCreationSort: boolean = true;
  ascendantUpdateSort: boolean = true;
  ascendantAlphabetciSort: boolean = true;
  totalPages: number = 0;
  pagedItems: any[] = [];
  unFiltredpagedItems: any[] = [];

  recipeSearch = new FormControl();
  actualPage: number = 1;
  defaultPageSize: number = 8;


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

    this.recipeService.getTotalPage().subscribe(totalpage => {
      this.totalpage = totalpage;
    });

    this.ascendantCreationSort = true;
    this.filterCreationDate();
  }


  onFilterClick(event) {
    if (event === 'refreshRecipes') {
      this.getRecipes();
      this.ascendantCreationSort = false;
      this.filterCreationDate();
    }
  }


  public openRecipeDetailDialog(recipe: Recipe) {
    this.dialog.open(RecipeDetailsDialogComponent, {
      width: '80%',
      data: {recipe: recipe}
    });
  }

  public openRecipeCommentDialog(recipe: Recipe) {
    this.dialog.open(RecipeCommentComponent, {
      width: '80%',
      data: {recipe: recipe, form: this.generateCommentForm()}
    });
  }

  public openRecipeEditDialog(recipe: Recipe) {
    this.dialog.open(RecipeEditComponent, {
      width: '80%',
      data: {recipe: recipe, form: this.generateRecipeForm()}
    });
  }

  public openAddRecipeDialog() {
    this.dialog.open(AddDialogComponent, {
      width: '80%',
      data: {form: this.generateRecipeForm()}
    })
  }

  public openStatRecipeDialog(recipe: Recipe) {
    this.dialog.open(RecipeStatComponent, {
      width: '1100px',
      height: '500px',
      data: {recipe: recipe}
    })
  }


  public getRecipes() {
    this.pagedItems = [];
    this.unFiltredpagedItems = [];
    this.recipeService.getRecipesPaginated(this.paginator.pageIndex, this.paginator.pageSize).subscribe(recipes => {
      for (let recipe of recipes) {
        this.pagedItems.push(recipe);
        this.unFiltredpagedItems.push(recipe);
      }
    });
  }

  public filterCreationDate() {
    this.ascendantCreationSort = !this.ascendantCreationSort;
    if (this.ascendantCreationSort) {
      this.pagedItems = this.pagedItems.sort((a: Recipe, b: Recipe) => {
        let date1 = new Date(a.createdAt);
        let date2 = new Date(b.createdAt);
        return date1.getTime() - date2.getTime();

      });
    } else {
      this.pagedItems = this.pagedItems.sort((a: Recipe, b: Recipe) => {
        let date1 = new Date(a.createdAt);
        let date2 = new Date(b.createdAt);
        return date2.getTime() - date1.getTime();

      });
    }
  }

  public filterUpdateDate() {
    this.ascendantUpdateSort = !this.ascendantUpdateSort;
    if (this.ascendantUpdateSort) {
      this.pagedItems = this.pagedItems.sort((a: Recipe, b: Recipe) => {
        let date1 = new Date(a.updatedAt);
        let date2 = new Date(b.updatedAt);
        return date1.getTime() - date2.getTime();

      });
    } else {
      this.pagedItems = this.pagedItems.sort((a: Recipe, b: Recipe) => {
        let date1 = new Date(a.updatedAt);
        let date2 = new Date(b.updatedAt);
        return date2.getTime() - date1.getTime();

      });
    }
  }

  filterAlphabeticName() {
    this.ascendantAlphabetciSort = !this.ascendantAlphabetciSort;
    if (this.ascendantAlphabetciSort) {
      this.pagedItems = this.pagedItems.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    } else {
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
      name: [''],
      createdAt: [''],
      updatedAt: [''],
      user: [''],
      ingredients: [''],
      desciption: ['']
    })
  }

  public generateCommentForm(): FormGroup {
    return this.formBuilder.group({
      _id: [],
      content: [''],
    })
  }


  ngAfterViewInit() {
    this.getRecipes();
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      const valueToAddToTotalPages = length % pageSize > 0 ? 1 : 0;
      return length + ' entrée(s) - Page ' + (page + 1) + ' sur ' + Math.min(1, (Math.trunc(length / pageSize) + valueToAddToTotalPages));
    };
    this.paginator._intl.itemsPerPageLabel = 'Entrées par page :'
    this.paginator.page.subscribe(() => {
      this.getRecipes();
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  public searchRecipe() {
    this.pagedItems = [];
    console.log(this.recipeSearch.value);
    this.recipeService.getRecipesPaginated(this.paginator.pageIndex, this.paginator.pageSize, this.recipeSearch.value).subscribe(recipes => {
      this.pagedItems = [];
      for (let recipe of recipes) {
        this.pagedItems.push(recipe);
      }
    });
  }

}
