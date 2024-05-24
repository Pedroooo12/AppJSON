/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { InformationJsonComponent } from './informationJson.component';

describe('InformationJsonComponent', () => {
  let component: InformationJsonComponent;
  let fixture: ComponentFixture<InformationJsonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationJsonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
