import {
  AfterViewInit,
  Component, ElementRef,
  OnInit,
  VERSION,
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
import {Observable} from "rxjs";

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

  toggleState() {
    this.animState = this.animState === 'active' ? 'inactive' : 'active';
  }

  public form: FormGroup;
  recipes: Array<Recipe> = [];
  ascendantCreationSort: boolean = true;
  ascendantUpdateSort: boolean = true;
  ascendantAlphabetciSort: boolean = true;
  totalPages:number=0;
  pager: any = {};
  pagedItems: any[] = [];
  recipeSearch = new FormControl();
  defaultPageSize: number = 8;
  actualPage: number = 1;
  public readonly SEARCH_DELAY_IN_MILLISECONDS: number = 400;
  public pageEvent: PageEvent;


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
    this.recipeService.getTotalPage().subscribe(totalPages => {
      this.totalPages=totalPages;
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
      width: '1000px',
      height: '800px',
      data: {recipe: recipe}
    });
  }

  public openRecipeCommentDialog(recipe: Recipe) {
    this.dialog.open(RecipeCommentComponent, {
      width: '1000px',
      height: '800px',
      data: {recipe: recipe, form: this.generateCommentForm}
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
    console.log(this.actualPage);
    this.pagedItems = [];
    this.recipeService.getRecipesPaginated(this.paginator.pageIndex, this.paginator.pageSize).subscribe(recipes => {
      for (let recipe of recipes) {
        this.pagedItems.push(recipe);
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
      _id: [],
      name: [''],
      createdAt: [''],
      updatedAt: [],
      user: [],
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
    this.paginator._intl.itemsPerPageLabel = 'Entrées par page :';
    this.paginator.page.subscribe(() => {
      this.getRecipes();
    });
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

}
