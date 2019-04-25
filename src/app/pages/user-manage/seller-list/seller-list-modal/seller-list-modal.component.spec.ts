import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SellerListModalComponent} from './seller-list-modal.component';

describe('SellerListModalComponent', () => {
    let component: SellerListModalComponent;
    let fixture: ComponentFixture<SellerListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SellerListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SellerListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
