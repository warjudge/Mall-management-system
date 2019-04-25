import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettlementSellerListComponent} from './settlement-seller-list.component';

describe('SettlementSellerListComponent', () => {
    let component: SettlementSellerListComponent;
    let fixture: ComponentFixture<SettlementSellerListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettlementSellerListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettlementSellerListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
