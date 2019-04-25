import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RefundListModalComponent} from './refund-list-modal.component';

describe('RefundListModalComponent', () => {
    let component: RefundListModalComponent;
    let fixture: ComponentFixture<RefundListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RefundListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RefundListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
