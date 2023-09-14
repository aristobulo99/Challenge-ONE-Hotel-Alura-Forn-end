import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sistema-de-busqueda',
  templateUrl: './sistema-de-busqueda.component.html',
  styleUrls: ['./sistema-de-busqueda.component.scss']
})
export class SistemaDeBusquedaComponent implements OnInit{

  public seleccionDeBusqueda: boolean = true;
  public formBusqueda: FormGroup = new FormGroup({});
  public identificador!: number;
  public selectDelete: boolean = false;
  public selectUpdate: boolean = false;

  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.inicializarFormBusqueda();
  }

  inicializarFormBusqueda(){
    this.formBusqueda = this.fb.group(
      {
        identificador: new FormControl<number|undefined>(undefined)
      }
    );
  }

  selectHuesped(){
    this.seleccionDeBusqueda = true;
  }

  selectReserva(){
    this.seleccionDeBusqueda = false;
  }

  realizarBusqueda(){
    this.identificador = this.formBusqueda.get('identificador')?.value;
  }

  deleteHuesped(){
    this.selectDelete = true;
    setTimeout(() => {
      this.selectDelete = false
    }, 300);
  }

  updateHuesped(){
    this.selectUpdate = true;
  }

  edicionRealizada(result:boolean){
    this.selectUpdate = result;
  }

}
