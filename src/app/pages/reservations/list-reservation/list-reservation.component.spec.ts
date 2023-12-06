import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservationComponent } from './list-reservation.component';

describe('ListReservationComponent', () => {
  let component: ListReservationComponent;
  let fixture: ComponentFixture<ListReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListReservationComponent]
    });
    fixture = TestBed.createComponent(ListReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
