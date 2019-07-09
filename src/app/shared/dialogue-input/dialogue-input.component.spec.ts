import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueInputComponent } from './dialogue-input.component';

describe('DialogueInputComponent', () => {
  let component: DialogueInputComponent;
  let fixture: ComponentFixture<DialogueInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogueInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
