import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestlandingpageComponent } from './restlandingpage.component';

describe('RestlandingpageComponent', () => {
  let component: RestlandingpageComponent;
  let fixture: ComponentFixture<RestlandingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestlandingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestlandingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
