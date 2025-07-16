/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TesttabbarComponent } from './testtabbar.component';

describe('TesttabbarComponent', () => {
  let component: TesttabbarComponent;
  let fixture: ComponentFixture<TesttabbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesttabbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesttabbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
