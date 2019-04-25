import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReturnProcessingModalComponent} from './return-processing-modal.component';

describe('ReturnProcessingModalComponent', () => {
    let component: ReturnProcessingModalComponent;
    let fixture: ComponentFixture<ReturnProcessingModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReturnProcessingModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReturnProcessingModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
