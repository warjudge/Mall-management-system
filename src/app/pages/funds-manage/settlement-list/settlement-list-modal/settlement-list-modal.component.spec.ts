import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettlementListModalComponent} from './settlement-list-modal.component';

describe('SettlementListModalComponent', () => {
    let component: SettlementListModalComponent;
    let fixture: ComponentFixture<SettlementListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettlementListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettlementListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
