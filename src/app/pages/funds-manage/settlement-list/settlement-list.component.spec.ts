import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SettlementListComponent} from './settlement-list.component';

describe('SettlementListComponent', () => {
    let component: SettlementListComponent;
    let fixture: ComponentFixture<SettlementListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SettlementListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SettlementListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
