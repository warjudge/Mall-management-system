import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityCommodityListModalComponent} from './activity-commodity-list-modal.component';

describe('ActivityCommodityListModalComponent', () => {
    let component: ActivityCommodityListModalComponent;
    let fixture: ComponentFixture<ActivityCommodityListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivityCommodityListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityCommodityListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
