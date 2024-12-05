import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBatimentModalComponent } from './update-batiment-modal.component';

describe('UpdateBatimentModalComponent', () => {
  let component: UpdateBatimentModalComponent;
  let fixture: ComponentFixture<UpdateBatimentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBatimentModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBatimentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
