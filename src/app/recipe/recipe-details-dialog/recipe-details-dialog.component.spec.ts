import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeDetailsDialogComponent } from './recipe-details-dialog.component';

describe('RecipeDetailsDialogComponent', () => {
  let component: RecipeDetailsDialogComponent;
  let fixture: ComponentFixture<RecipeDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
