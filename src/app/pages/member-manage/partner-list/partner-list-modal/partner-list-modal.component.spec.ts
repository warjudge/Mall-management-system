import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PartnerListModalComponent} from './partner-list-modal.component';

describe('PartnerListModalComponent', () => {
    let component: PartnerListModalComponent;
    let fixture: ComponentFixture<PartnerListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PartnerListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PartnerListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
