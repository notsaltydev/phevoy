import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansAndPaymentComponent } from './plans-and-payment.component';

describe('PlansAndPaymentComponent', () => {
    let component: PlansAndPaymentComponent;
    let fixture: ComponentFixture<PlansAndPaymentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlansAndPaymentComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PlansAndPaymentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
