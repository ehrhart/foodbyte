import {Component, OnInit, VERSION} from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  recipes: any [];
  rows: number[] ;
  ElementNumber: number;
  innerWidth: number;
  ngVersion: string = VERSION.full;
  matVersion: string = '5.1.0';
  breakpoint: number;

  constructor() { }

  ngOnInit() {

    this.ElementNumber = 5;
    this.rows = Array.from(
      Array(Math.ceil(this.recipes.length / 2)).keys()
    );
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 5;
    this.innerWidth = window.innerWidth;
  }

}
