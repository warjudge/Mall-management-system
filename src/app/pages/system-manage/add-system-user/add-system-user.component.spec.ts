import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AddSystemUserComponent} from './add-system-user.component';

describe('AddSystemUserComponent', () => {
    let component: AddSystemUserComponent;
    let fixture: ComponentFixture<AddSystemUserComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddSystemUserComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddSystemUserComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
