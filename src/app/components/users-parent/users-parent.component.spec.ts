import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersParentComponent } from './users-parent.component';

describe('UsersParentComponent', () => {
  let component: UsersParentComponent;
  let fixture: ComponentFixture<UsersParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersParentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
