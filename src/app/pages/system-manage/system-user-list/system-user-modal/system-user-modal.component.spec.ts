import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SystemUserModalComponent} from './system-user-modal.component';

describe('SystemUserModalComponent', () => {
    let component: SystemUserModalComponent;
    let fixture: ComponentFixture<SystemUserModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SystemUserModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemUserModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
