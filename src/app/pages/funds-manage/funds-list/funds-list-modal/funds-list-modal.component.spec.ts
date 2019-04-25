import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FundsListModalComponent} from './funds-list-modal.component';

describe('FundsListModalComponent', () => {
    let component: FundsListModalComponent;
    let fixture: ComponentFixture<FundsListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FundsListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FundsListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
