import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductsDetailsComponent } from './add-products-details.component';

describe('AddProductsDetailsComponent', () => {
  let component: AddProductsDetailsComponent;
  let fixture: ComponentFixture<AddProductsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
