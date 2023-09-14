import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Huesped, RegistroHUesped } from 'src/app/interfaces/huesped.interface';
import { HuespedService } from 'src/app/service/huesped.service';

@Component({
  selector: 'app-lista-de-huespedes',
  templateUrl: './lista-de-huespedes.component.html',
  styleUrls: ['./lista-de-huespedes.component.scss']
})
export class ListaDeHuespedesComponent implements OnInit, OnChanges{

  @Input() identificador!: number;
  @Input() selectDelete: boolean = false;
  @Input() selectUpdate: boolean = false;
  @Output() emmitEdicion: EventEmitter<boolean> = new EventEmitter<boolean>();
  public listHuespedes: Huesped[] = [];
  public listSelectHuesped: number[] = [];
  public listEditHuespedes: Huesped[] = [];
  public formHuesped: FormGroup = new FormGroup({});

  constructor(
    private huespedService: HuespedService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.getHuespedes();
    this.generarFormHuesped();
  }

  generarFormHuesped(){
    this.formHuesped = this.fb.group(
      {
        nombre: new FormControl<string>('', [Validators.required]),
        apellido: new FormControl<string>('', [Validators.required]),
        fechaNacimiento: new FormControl<Date|null>(null, [Validators.required]),
        nacionalidad: new FormControl<Date | null>(null,[Validators.required]),
        telefono: new FormControl('',[Validators.required])
      }
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['identificador'] != undefined) {
      this.identificador = changes['identificador'].currentValue;
      this.getHuespedId(this.identificador);
    }

    if(this.selectDelete){
      this.deleteHUesped();
    }

    if(this.selectUpdate){
      if(this.listEditHuespedes.length == 1 ){
        this.formHuesped.get('nombre')?.setValue(this.listEditHuespedes[0].hue_nom);
        this.formHuesped.get('apellido')?.setValue(this.listEditHuespedes[0].hue_ape);
        this.formHuesped.get('fechaNacimiento')?.setValue(this.convertDate(this.listEditHuespedes[0].hue_fec_nac));
        this.formHuesped.get('nacionalidad')?.setValue(this.listEditHuespedes[0].hue_nacionalidad);
        this.formHuesped.get('telefono')?.setValue(this.listEditHuespedes[0].hue_telf);
      }else{
        alert('Debe de seleccionar un solo huésped');
        setTimeout(()=>{
          this.emmitEdicion.emit(false)
        },0);
      }
    }
  }

  getHuespedes(){
    this.huespedService.getHuespedes().subscribe(
      result => {
        this.listHuespedes = result;
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

  getHuespedId(id: number){
    if(id !== undefined && id !== null){
      this.huespedService.getHuespedId(''+id).subscribe(
        result => {
          this.listHuespedes = [result];
        }
      );
    }else if(id === null){
      this.listHuespedes = [];
      this.getHuespedes();
    }
  }

  seleccionarHuesped(id: number, huesped: Huesped){
    const index = this.listSelectHuesped.indexOf(id);
    if(index !== -1){
      this.listSelectHuesped.splice(index, 1);
      this.listEditHuespedes.splice(index, 1);
    }else{
      this.listSelectHuesped.push(id);
      this.listEditHuespedes.push(huesped);
    }
  }

  seleccionEdicionHuesped(huesped: Huesped){
    this.formHuesped.get('')?.setValue
  }

  deleteHUesped(){
    this.listSelectHuesped.forEach(id => {
      this.huespedService.deleteHuesped(id).subscribe(
        result => {
          if(!result.Eliminado){
            alert("No se pudo eliminar el huesped, trate primero eliminado su reserva");
          }
        }
      );
      setTimeout(() => {
        this.listHuespedes = [];
        this.getHuespedes();
      }, 500);

    });
  }

  editarHUesped(){
    let huesped: RegistroHUesped = {
      hue_nom: this.formHuesped.get('nombre')?.value,
      hue_ape: this.formHuesped.get('apellido')?.value,
      hue_fec_nac: this.formHuesped.get('fechaNacimiento')?.value,
      hue_nacionalidad: this.formHuesped.get('nacionalidad')?.value,
      hue_telf: this.formHuesped.get('telefono')?.value
    }
    this.huespedService.updateHuesped(this.listEditHuespedes[0].hue_id, huesped).subscribe(
      result => {
        if(result.hue_id === this.listEditHuespedes[0].hue_id){
          this.listHuespedes = [];
          this.getHuespedes();
          this.emmitEdicion.emit(false);
        }
      }
    );
  }
}
