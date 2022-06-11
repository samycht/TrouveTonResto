import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestauranttemplateComponent } from './restauranttemplate.component';

describe('RestauranttemplateComponent', () => {
  let component: RestauranttemplateComponent;
  let fixture: ComponentFixture<RestauranttemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestauranttemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestauranttemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
