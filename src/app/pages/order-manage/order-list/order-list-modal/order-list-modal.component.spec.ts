import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrderListModalComponent} from './order-list-modal.component';

describe('OrderListModalComponent', () => {
    let component: OrderListModalComponent;
    let fixture: ComponentFixture<OrderListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrderListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
