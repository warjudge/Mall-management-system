import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ActivityListModalComponent} from './activity-list-modal.component';

describe('ActivityListModalComponent', () => {
    let component: ActivityListModalComponent;
    let fixture: ComponentFixture<ActivityListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActivityListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActivityListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
