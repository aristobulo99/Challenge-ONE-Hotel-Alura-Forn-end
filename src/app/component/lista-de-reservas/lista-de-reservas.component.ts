import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Reserva, ReservaHuesped } from 'src/app/interfaces/reserva.interface';
import { ReservasService } from 'src/app/service/reservas.service';

@Component({
  selector: 'app-lista-de-reservas',
  templateUrl: './lista-de-reservas.component.html',
  styleUrls: ['./lista-de-reservas.component.scss']
})
export class ListaDeReservasComponent implements OnInit, OnChanges{

  @Input() identificador!: number;
  @Input() selectDelete: boolean = false;
  @Input() selectUpdate: boolean = false;
  @Output() emmitEdicion: EventEmitter<boolean> = new EventEmitter<boolean>();
  public listReservas: ReservaHuesped[] = [];
  public listSelectReservas: number[] = [];
  public listEditReservas: ReservaHuesped[] = [];
  public formularioDeReserva: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private reservasService: ReservasService
  ){}

  ngOnInit(): void {
    this.obtenerReservas();
    this.initialFrom();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['identificador'] != undefined) {
      this.identificador = changes['identificador'].currentValue;
      this.getReservaId(this.identificador);
    }

    if(this.selectDelete){
      this.deleteReserva();
    }

    if(this.selectUpdate){
      if(this.listEditReservas.length == 1 ){
        this.formularioDeReserva.get('fechaInit')?.setValue(this.convertDate(this.listEditReservas[0].res_fecha_entrada));
        this.formularioDeReserva.get('fechaOut')?.setValue(this.convertDate(this.listEditReservas[0].res_fecha_salida));
        this.formularioDeReserva.get('formaDePago')?.setValue(this.listEditReservas[0].res_forma_pago);
        this.formularioDeReserva.get('valor')?.setValue(this.listEditReservas[0].res_valor);
      }else{
        alert('Debe de seleccionar una sola Reserva');
        setTimeout(()=>{
          this.emmitEdicion.emit(false)
        },0);
      }
    }
  }

  initialFrom(){
    this.formularioDeReserva = this.fb.group(
      {
        fechaInit: new FormControl(new Date(), [Validators.required]),
        fechaOut: new FormControl(new Date(), [Validators.required]),
        formaDePago: new FormControl('', [Validators.required]),
        valor: new FormControl(0, [Validators.required]),
      }
    );
  }

  obtenerReservas(){
    this.reservasService.getReservas2().subscribe(
      result => {
        this.listReservas = result;
      }
    );
  }

  convertDate(value: string){
    const date = new Date(value);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getReservaId(id: number){
    if(id !== undefined && id !== null){
      this.reservasService.getReservaId2(id).subscribe(
        result => {
          this.listReservas = [result];
        }
      );
    }else if(id === null){
      this.listReservas = [];
      this.obtenerReservas();
    }
  }

  seleccionarReserva(id: number, reserva: ReservaHuesped){
    const index = this.listSelectReservas.indexOf(id);
    if(index !== -1){
      this.listSelectReservas.splice(index, 1);
      this.listEditReservas.splice(index, 1);
    }else{
      this.listSelectReservas.push(id);
      this.listEditReservas.push(reserva);
    }
  }

  deleteReserva(){
    this.listSelectReservas.forEach(id => {
      this.reservasService.deleteReserva(id).subscribe(
        result => {
          if(!result.Eliminado){
            alert("No se pudo eliminar la reserva, se produjo un error");
          }
        }
      );
      setTimeout(() => {
        this.listSelectReservas = [];
        this.obtenerReservas();
      }, 500);

    });
  }

  editarReserva(){
    let reserva: Reserva = {
      res_fecha_entrada: this.formularioDeReserva.get('fechaInit')?.value,
      res_fecha_salida: this.formularioDeReserva.get('fechaOut')?.value,
      res_forma_pago: this.formularioDeReserva.get('formaDePago')?.value,
      res_valor: this.formularioDeReserva.get('valor')?.value
    };
    this.reservasService.editarReserva(this.listEditReservas[0].res_id, reserva).subscribe(
      result => {
        if(result.res_id === this.listEditReservas[0].res_id){
          this.listEditReservas = [];
          this.listReservas = [];
          this.obtenerReservas();
          this.emmitEdicion.emit(false);
        }
      }
    );
  }

}
