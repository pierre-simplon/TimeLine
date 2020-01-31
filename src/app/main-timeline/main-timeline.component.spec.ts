import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { mainTimelineComponent } from './main-timeline.component';

describe('FormlistComponent', () => {
  let component: mainTimelineComponent;
  let fixture: ComponentFixture<mainTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ mainTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(mainTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
