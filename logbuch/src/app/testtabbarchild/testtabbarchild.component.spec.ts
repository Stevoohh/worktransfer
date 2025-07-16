/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TesttabbarchildComponent } from './testtabbarchild.component';

describe('TesttabbarchildComponent', () => {
  let component: TesttabbarchildComponent;
  let fixture: ComponentFixture<TesttabbarchildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesttabbarchildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesttabbarchildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
