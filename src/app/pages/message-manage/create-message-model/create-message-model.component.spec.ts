import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateMessageModelComponent} from './create-message-model.component';

describe('CreateMessageModelComponent', () => {
    let component: CreateMessageModelComponent;
    let fixture: ComponentFixture<CreateMessageModelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateMessageModelComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateMessageModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
