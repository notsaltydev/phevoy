import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceItemComponent } from './conference-item.component';

describe('ConferenceItemComponent', () => {
  let component: ConferenceItemComponent;
  let fixture: ComponentFixture<ConferenceItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConferenceItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferenceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
