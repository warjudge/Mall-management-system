import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FundsListComponent} from './funds-list.component';

describe('FundsListComponent', () => {
    let component: FundsListComponent;
    let fixture: ComponentFixture<FundsListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FundsListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FundsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
