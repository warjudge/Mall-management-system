import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SpecialOfferModalComponent} from './special-offer-modal.component';

describe('SpecialOfferModalComponent', () => {
    let component: SpecialOfferModalComponent;
    let fixture: ComponentFixture<SpecialOfferModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpecialOfferModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpecialOfferModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
