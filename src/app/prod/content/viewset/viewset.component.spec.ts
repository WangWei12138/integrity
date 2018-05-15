import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewsetComponent } from './viewset.component';

describe('ViewsetComponent', () => {
  let component: ViewsetComponent;
  let fixture: ComponentFixture<ViewsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
