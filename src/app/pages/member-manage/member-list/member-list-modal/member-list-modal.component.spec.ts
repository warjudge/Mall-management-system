import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MemberListModalComponent} from './member-list-modal.component';

describe('MemberListModalComponent', () => {
    let component: MemberListModalComponent;
    let fixture: ComponentFixture<MemberListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MemberListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MemberListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
