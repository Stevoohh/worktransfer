/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ProtokolleComponent } from './protokolle.component';

describe('ProtokolleComponent', () => {
  let component: ProtokolleComponent;
  let fixture: ComponentFixture<ProtokolleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtokolleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtokolleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
