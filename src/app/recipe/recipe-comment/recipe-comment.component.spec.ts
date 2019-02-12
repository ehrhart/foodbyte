import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCommentComponent } from './recipe-comment.component';

describe('RecipeCommentComponent', () => {
  let component: RecipeCommentComponent;
  let fixture: ComponentFixture<RecipeCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
