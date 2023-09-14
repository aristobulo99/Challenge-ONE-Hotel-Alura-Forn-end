import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeReservasComponent } from './lista-de-reservas.component';

describe('ListaDeReservasComponent', () => {
  let component: ListaDeReservasComponent;
  let fixture: ComponentFixture<ListaDeReservasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDeReservasComponent]
    });
    fixture = TestBed.createComponent(ListaDeReservasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
