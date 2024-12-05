import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformerComponent } from './informer.component';

describe('InformerComponent', () => {
  let component: InformerComponent;
  let fixture: ComponentFixture<InformerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
