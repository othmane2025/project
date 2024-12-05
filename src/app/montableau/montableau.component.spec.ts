import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonTableauComponent } from './montableau.component';

describe('MonTableauComponent', () => {
  let component: MonTableauComponent;
  let fixture: ComponentFixture<MonTableauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonTableauComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonTableauComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
