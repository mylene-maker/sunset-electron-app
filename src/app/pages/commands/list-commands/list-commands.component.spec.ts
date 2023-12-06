import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandsComponent } from './list-commands.component';

describe('ListCommandsComponent', () => {
  let component: ListCommandsComponent;
  let fixture: ComponentFixture<ListCommandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListCommandsComponent]
    });
    fixture = TestBed.createComponent(ListCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
