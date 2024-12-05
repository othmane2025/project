import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppercuComponent } from './appercu.component';

describe('AppercuComponent', () => {
  let component: AppercuComponent;
  let fixture: ComponentFixture<AppercuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppercuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppercuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
