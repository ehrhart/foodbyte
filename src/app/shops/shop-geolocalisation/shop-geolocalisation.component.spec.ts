import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopGeolocalisationComponent } from './shop-geolocalisation.component';

describe('ShopGeolocalisationComponent', () => {
  let component: ShopGeolocalisationComponent;
  let fixture: ComponentFixture<ShopGeolocalisationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopGeolocalisationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopGeolocalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
