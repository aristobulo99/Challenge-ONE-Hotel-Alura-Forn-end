import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaDeBusquedaComponent } from './sistema-de-busqueda.component';

describe('SistemaDeBusquedaComponent', () => {
  let component: SistemaDeBusquedaComponent;
  let fixture: ComponentFixture<SistemaDeBusquedaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SistemaDeBusquedaComponent]
    });
    fixture = TestBed.createComponent(SistemaDeBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
