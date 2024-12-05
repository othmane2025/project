import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatComponent } from './etat.component';

describe('EtatComponent', () => {
  let component: EtatComponent;
  let fixture: ComponentFixture<EtatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
