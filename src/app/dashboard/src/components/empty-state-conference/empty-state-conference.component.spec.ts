import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStateConferenceComponent } from './empty-state-conference.component';

describe('EmptyStateConferenceComponent', () => {
    let component: EmptyStateConferenceComponent;
    let fixture: ComponentFixture<EmptyStateConferenceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EmptyStateConferenceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EmptyStateConferenceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
