import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommodityModalComponent} from './commodity-modal.component';

describe('CommodityModalComponent', () => {
    let component: CommodityModalComponent;
    let fixture: ComponentFixture<CommodityModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommodityModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommodityModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
