import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecommendCommodityModalComponent} from './recommend-commodity-modal.component';

describe('RecommendCommodityModalComponent', () => {
    let component: RecommendCommodityModalComponent;
    let fixture: ComponentFixture<RecommendCommodityModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecommendCommodityModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecommendCommodityModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
