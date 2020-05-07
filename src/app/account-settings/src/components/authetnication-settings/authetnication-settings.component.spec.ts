import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthetnicationSettingsComponent } from './authetnication-settings.component';

describe('AuthetnicationSettingsComponent', () => {
    let component: AuthetnicationSettingsComponent;
    let fixture: ComponentFixture<AuthetnicationSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AuthetnicationSettingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthetnicationSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
