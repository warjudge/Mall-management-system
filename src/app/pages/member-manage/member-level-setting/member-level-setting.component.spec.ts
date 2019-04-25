import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MemberLevelSettingComponent} from './member-level-setting.component';

describe('MemberLevelSettingComponent', () => {
    let component: MemberLevelSettingComponent;
    let fixture: ComponentFixture<MemberLevelSettingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MemberLevelSettingComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MemberLevelSettingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
