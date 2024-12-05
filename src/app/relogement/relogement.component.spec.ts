import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelogementComponent } from './relogement.component';

describe('RelogementComponent', () => {
  let component: RelogementComponent;
  let fixture: ComponentFixture<RelogementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelogementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelogementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
