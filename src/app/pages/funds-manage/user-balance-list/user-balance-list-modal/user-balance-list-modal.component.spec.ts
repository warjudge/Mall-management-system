import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBalanceListModalComponent} from './user-balance-list-modal.component';

describe('UserBalanceListModalComponent', () => {
    let component: UserBalanceListModalComponent;
    let fixture: ComponentFixture<UserBalanceListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserBalanceListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserBalanceListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
