import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamasComponent } from './llamas.component';

describe('LlamasComponent', () => {
  let component: LlamasComponent;
  let fixture: ComponentFixture<LlamasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlamasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
