import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WarehouseListModalComponent} from './warehouse-list-modal.component';

describe('WarehouseListModalComponent', () => {
    let component: WarehouseListModalComponent;
    let fixture: ComponentFixture<WarehouseListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WarehouseListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WarehouseListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
