/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArticoloComponent } from './articolo.component';

describe('ArticoloComponent', () => {
  let component: ArticoloComponent;
  let fixture: ComponentFixture<ArticoloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticoloComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
