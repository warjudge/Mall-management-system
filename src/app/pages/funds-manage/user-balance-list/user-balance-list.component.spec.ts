import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UserBalanceListComponent} from './user-balance-list.component';

describe('UserBalanceListComponent', () => {
    let component: UserBalanceListComponent;
    let fixture: ComponentFixture<UserBalanceListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UserBalanceListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UserBalanceListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
