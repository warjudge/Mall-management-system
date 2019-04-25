import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MonthlySettingComponent} from './monthly-setting.component';

describe('MonthlySettingComponent', () => {
    let component: MonthlySettingComponent;
    let fixture: ComponentFixture<MonthlySettingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MonthlySettingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MonthlySettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
