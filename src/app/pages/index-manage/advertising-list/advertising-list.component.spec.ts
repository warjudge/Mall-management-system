import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AdvertisingListComponent} from './advertising-list.component';

describe('AdvertisingListComponent', () => {
    let component: AdvertisingListComponent;
    let fixture: ComponentFixture<AdvertisingListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdvertisingListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdvertisingListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
