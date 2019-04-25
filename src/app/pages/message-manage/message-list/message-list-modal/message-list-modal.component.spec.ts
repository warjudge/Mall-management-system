import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageListModalComponent} from './message-list-modal.component';

describe('MessageListModalComponent', () => {
    let component: MessageListModalComponent;
    let fixture: ComponentFixture<MessageListModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessageListModalComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageListModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
