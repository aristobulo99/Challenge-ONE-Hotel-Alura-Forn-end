import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeHuespedComponent } from './registro-de-huesped.component';

describe('RegistroDeHuespedComponent', () => {
  let component: RegistroDeHuespedComponent;
  let fixture: ComponentFixture<RegistroDeHuespedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroDeHuespedComponent]
    });
    fixture = TestBed.createComponent(RegistroDeHuespedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
