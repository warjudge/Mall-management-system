import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CommodityCategoryComponent} from './commodity-category.component';

describe('CommodityCategoryComponent', () => {
    let component: CommodityCategoryComponent;
    let fixture: ComponentFixture<CommodityCategoryComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommodityCategoryComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CommodityCategoryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
