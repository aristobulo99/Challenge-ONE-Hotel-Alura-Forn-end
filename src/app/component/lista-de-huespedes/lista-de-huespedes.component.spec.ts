import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeHuespedesComponent } from './lista-de-huespedes.component';

describe('ListaDeHuespedesComponent', () => {
  let component: ListaDeHuespedesComponent;
  let fixture: ComponentFixture<ListaDeHuespedesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaDeHuespedesComponent]
    });
    fixture = TestBed.createComponent(ListaDeHuespedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
