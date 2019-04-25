import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddRecommendFieldComponent} from './add-recommend-field.component';

describe('AddRecommendFieldComponent', () => {
    let component: AddRecommendFieldComponent;
    let fixture: ComponentFixture<AddRecommendFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddRecommendFieldComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddRecommendFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
