import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdvertisingListModalComponent} from './advertising-list-modal.component';

describe('AdvertisingListModalComponent', () => {
    let component: AdvertisingListModalComponent;
    let fixture: ComponentFixture<AdvertisingListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdvertisingListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertisingListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
