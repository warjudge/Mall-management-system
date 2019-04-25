import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ReturnProcessingComponent} from './return-processing.component';

describe('ReturnProcessingComponent', () => {
    let component: ReturnProcessingComponent;
    let fixture: ComponentFixture<ReturnProcessingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReturnProcessingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReturnProcessingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
