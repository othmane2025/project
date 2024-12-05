import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrondissmentComponent } from './arrondissment.component';

describe('ArrondissmentComponent', () => {
  let component: ArrondissmentComponent;
  let fixture: ComponentFixture<ArrondissmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrondissmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrondissmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
