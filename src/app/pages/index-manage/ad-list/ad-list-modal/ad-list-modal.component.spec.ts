import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdListModalComponent} from './ad-list-modal.component';

describe('AdListModalComponent', () => {
    let component: AdListModalComponent;
    let fixture: ComponentFixture<AdListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
