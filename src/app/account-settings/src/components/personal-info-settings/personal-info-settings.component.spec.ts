import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoSettingsComponent } from './personal-info-settings.component';

describe('PersonalInfoSettingsComponent', () => {
    let component: PersonalInfoSettingsComponent;
    let fixture: ComponentFixture<PersonalInfoSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PersonalInfoSettingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonalInfoSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
