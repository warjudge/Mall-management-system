import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddSpecialFieldComponent} from './add-special-field.component';

describe('AddSpecialFieldComponent', () => {
    let component: AddSpecialFieldComponent;
    let fixture: ComponentFixture<AddSpecialFieldComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddSpecialFieldComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddSpecialFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
