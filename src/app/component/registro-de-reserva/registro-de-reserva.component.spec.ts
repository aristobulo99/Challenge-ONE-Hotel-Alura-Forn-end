import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroDeReservaComponent } from './registro-de-reserva.component';

describe('RegistroDeReservaComponent', () => {
  let component: RegistroDeReservaComponent;
  let fixture: ComponentFixture<RegistroDeReservaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroDeReservaComponent]
    });
    fixture = TestBed.createComponent(RegistroDeReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
