import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateAdSpaceComponent} from './create-ad-space.component';

describe('CreateAdSpaceComponent', () => {
    let component: CreateAdSpaceComponent;
    let fixture: ComponentFixture<CreateAdSpaceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateAdSpaceComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateAdSpaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
