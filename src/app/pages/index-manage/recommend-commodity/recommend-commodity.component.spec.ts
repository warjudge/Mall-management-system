import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RecommendCommodityComponent} from './recommend-commodity.component';

describe('RecommendCommodityComponent', () => {
    let component: RecommendCommodityComponent;
    let fixture: ComponentFixture<RecommendCommodityComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecommendCommodityComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RecommendCommodityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
