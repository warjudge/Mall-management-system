import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityCommodityListComponent} from './activity-commodity-list.component';

describe('ActivityCommodityListComponent', () => {
    let component: ActivityCommodityListComponent;
    let fixture: ComponentFixture<ActivityCommodityListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivityCommodityListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityCommodityListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
