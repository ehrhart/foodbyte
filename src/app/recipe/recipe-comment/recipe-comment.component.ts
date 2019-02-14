import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {CommentsService} from "../../service/api/comments.service";
import {FormControl} from "@angular/forms";
import {Comment} from "../../Models/Comment";
import {User} from "../../Models/User";
import {AuthService} from "../../auth/auth.service";
import {Recipe} from "../../Models/Recipe";
import {CommunicationService} from "../../service/communication.service";

@Component({
  selector: 'app-recipe-comment',
  templateUrl: './recipe-comment.component.html',
  styleUrls: ['./recipe-comment.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class RecipeCommentComponent implements OnInit {

  public connectedUser: User;

  public recipeComments: Comment[] = [];


  constructor(public dialogRef: MatDialogRef<RecipeCommentComponent>,
              private commentService: CommentsService,
              private authService: AuthService,
              private communicationService: CommunicationService,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.communicationService.listen().subscribe((m: any) => {
      this.onFilterClick(m);
    });
  }

  ngOnInit() {

    this.commentService.getRecipeComments(this.data.recipe).subscribe(comments => {
      this.recipeComments = comments;
    });

    this.authService.me().subscribe(data => {
      this.connectedUser = data.user;
    });

    this.authService.$userSource.subscribe((user) => {
      this.connectedUser = user;
    });
    this.dialogRef.afterClosed().subscribe(dialogResult => {

      if (!dialogResult || dialogResult[0] !== 'confirm-comment') {
        return;
      }
    });
  }

  onFilterClick(event) {
    if (event === 'refreshComments') {
      this.commentService.getRecipeComments(this.data.recipe).subscribe(comments => {
        this.recipeComments = comments;
      });
    }
  }

  public onNoClick(): void {
    this.dialogRef.close(['cancel-comment']);
  }

  get content(): FormControl {
    return this.data.form.get('content') as FormControl;
  }

  addComment() {
    const formData = this.data.form.getRawValue();
    let commentToPost: Comment = new Comment(null, formData['content'], this.connectedUser);
    this.commentService.postCommentToRecipe(this.data.recipe, commentToPost);
  }

}
