import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityEntranceComponent} from './activity-entrance.component';

describe('ActivityEntranceComponent', () => {
    let component: ActivityEntranceComponent;
    let fixture: ComponentFixture<ActivityEntranceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivityEntranceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityEntranceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
