import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalizationSettingsComponent } from './internationalization-settings.component';

describe('InternationalizationSettingsComponent', () => {
    let component: InternationalizationSettingsComponent;
    let fixture: ComponentFixture<InternationalizationSettingsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InternationalizationSettingsComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InternationalizationSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
