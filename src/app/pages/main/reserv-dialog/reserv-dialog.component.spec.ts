import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservDialogComponent } from './reserv-dialog.component';

describe('ReservDialogComponent', () => {
  let component: ReservDialogComponent;
  let fixture: ComponentFixture<ReservDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReservDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
