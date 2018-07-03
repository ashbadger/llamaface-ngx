import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LlamaResultComponent } from './llama-result.component';

describe('LlamaResultComponent', () => {
  let component: LlamaResultComponent;
  let fixture: ComponentFixture<LlamaResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LlamaResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LlamaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
