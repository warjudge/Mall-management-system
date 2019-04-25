import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddWarehouseComponent} from './add-warehouse.component';

describe('AddWarehouseComponent', () => {
    let component: AddWarehouseComponent;
    let fixture: ComponentFixture<AddWarehouseComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddWarehouseComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddWarehouseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
