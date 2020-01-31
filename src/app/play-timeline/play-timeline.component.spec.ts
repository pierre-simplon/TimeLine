import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { playTimelineComponent } from './play-timeline.component';

describe('JeuComponent', () => {
  let component: playTimelineComponent;
  let fixture: ComponentFixture<playTimelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ playTimelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(playTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
