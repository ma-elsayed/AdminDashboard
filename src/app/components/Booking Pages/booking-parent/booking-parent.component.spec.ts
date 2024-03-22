import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingParentComponent } from './booking-parent.component';

describe('BookingParentComponent', () => {
  let component: BookingParentComponent;
  let fixture: ComponentFixture<BookingParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookingParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookingParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
