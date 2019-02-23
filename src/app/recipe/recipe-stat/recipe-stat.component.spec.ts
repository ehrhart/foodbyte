import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeStatComponent } from './recipe-stat.component';

describe('RecipeStatComponent', () => {
  let component: RecipeStatComponent;
  let fixture: ComponentFixture<RecipeStatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeStatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
