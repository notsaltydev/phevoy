import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GdprGuideComponent } from './gdpr-guide.component';

describe('GdprGuideComponent', () => {
    let component: GdprGuideComponent;
    let fixture: ComponentFixture<GdprGuideComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GdprGuideComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GdprGuideComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
