import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdsComponent } from './fds.component';

describe('FdsComponent', () => {
  let component: FdsComponent;
  let fixture: ComponentFixture<FdsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FdsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
