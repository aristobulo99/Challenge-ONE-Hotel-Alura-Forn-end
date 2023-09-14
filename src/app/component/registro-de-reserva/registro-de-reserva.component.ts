import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Huesped } from 'src/app/interfaces/huesped.interface';
import { Reserva } from 'src/app/interfaces/reserva.interface';
import { HuespedService } from 'src/app/service/huesped.service';
import { ReservasService } from 'src/app/service/reservas.service';

@Component({
  selector: 'app-registro-de-reserva',
  templateUrl: './registro-de-reserva.component.html',
  styleUrls: ['./registro-de-reserva.component.scss']
})
export class RegistroDeReservaComponent implements OnInit, AfterViewInit {

  @ViewChild('registrarReserva', { static: false }) registrarReserva!: ElementRef;
  @ViewChild('seleccionarHuesped', { static: false }) seleccionarHuesped!: ElementRef;
  @ViewChild('valorDeReserva', { static: false }) valorReserva!: ElementRef;
  @ViewChild('huepedSelect', {static: false}) huepedSelect!: ElementRef;
  private costoDeReserva: number = 45000;
  public formularioDeReserva: FormGroup = new FormGroup({});
  public formularioSelectHuesped: FormGroup = new FormGroup({});
  public minimumReservationDateIn: string = new Date().toISOString().split('T')[0];
  public minimumReservationDateOut!: string;
  public huespedes: Huesped[] = [];
  public selectList: number[] = [];
  public huespedSelect: boolean = false;

  constructor(
    private fb: FormBuilder,
    private huespedService: HuespedService,
    private reservaService: ReservasService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.initialFrom();
  }

  ngAfterViewInit(): void {
    this.registrarReserva.nativeElement.style.display = 'flex';
    this.seleccionarHuesped.nativeElement.style.display = 'none';
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

    this.formularioSelectHuesped = this.fb.group(
      {
        idHuesped: new FormControl(0, [Validators.required])
      }
    );
  }

  reservationValues(value: string){
    return this.formularioDeReserva.get(value);
  }

  selectDateIn(){
    let newDate = new Date(this.reservationValues('fechaInit')?.value);
    newDate.setDate(newDate.getDate() + 1);
    this.minimumReservationDateIn = newDate.toISOString().split('T')[0];
  }

  generarValorMonetario(cantidad: number): string{
    let i = 0;
    let resultado = '';
    while(true){
        if(cantidad == 0){
            break;
        }
        let numero = cantidad%10;
        if(i != 0 && i%3 == 0){
            resultado = numero +','+ resultado;
        }else{
            resultado = numero + resultado;
        }
        i++;
        cantidad = parseInt(''+(cantidad/10));
    }
    return '$'+resultado;
  }

  contizarReserva(){
    if(typeof(this.reservationValues('fechaInit')?.value) !== 'object' && typeof(this.reservationValues('fechaOut')?.value) !== 'object'){
      let dateIn = new Date(this.reservationValues('fechaInit')?.value);
      let dateOut = new Date(this.reservationValues('fechaOut')?.value);
      const diferenciaTiempo = dateOut.getTime() - dateIn.getTime();
      const diferenciaDias: number = Math.floor(diferenciaTiempo / (1000 * 3600 * 24));
      const costoTotal: number = this.costoDeReserva * diferenciaDias;
      this.reservationValues('valor')?.setValue(costoTotal);
      this.valorReserva.nativeElement.value = this.generarValorMonetario(costoTotal);
    }else{
      alert('Ingrese la fecha de entrada y salida para generar la cotización de la reserva');
    }
  }

  obtenerHuespedes(){
    this.huespedService.getHuespedes().subscribe(
      result => {
        this.huespedes = result;
      }
    );
  }

  registraInformacio(){
    if(this.formularioDeReserva.valid){
      this.registrarReserva.nativeElement.style.display = 'none';
      this.seleccionarHuesped.nativeElement.style.display = 'flex';
      this.obtenerHuespedes();
    }else{
      alert('Por favor llenar todos los campos');
    }
  }

  seleccionDeHuesped(id: number){
    const index = this.selectList.indexOf(id);
    if(index !== -1){
      this.selectList.splice(index, 1);
      this.huespedSelect = false;
      this.formularioSelectHuesped.get('idHuesped')?.setValue(0);
    }else if(!this.huespedSelect){
      this.selectList.push(id);
      this.huespedSelect = true;
      this.formularioSelectHuesped.get('idHuesped')?.setValue(id);
    }
  }

  registerReservation(){
    if(this.formularioSelectHuesped.valid && this.formularioSelectHuesped.get('idHuesped')?.value !== 0){
      let reserva: Reserva = {
        res_fecha_entrada: this.formularioDeReserva.get('fechaInit')?.value,
        res_fecha_salida: this.formularioDeReserva.get('fechaOut')?.value,
        res_forma_pago: this.formularioDeReserva.get('formaDePago')?.value,
        res_valor: this.formularioDeReserva.get('valor')?.value,
        huesped:{
          hue_id: this.formularioSelectHuesped.get('idHuesped')?.value
        }
      };
      this.reservaService.postReservasion(reserva).subscribe(
        result => {
          if(typeof(result.res_id) === 'number'){
            this.router.navigateByUrl('/menu-de-usuario');
          }
        }
      );
    }else{
      alert('Seleccione o Registre un huesped');
    }
  }

  buscarHuesoec(id: Event){
    const idValue = (id.target as HTMLInputElement).value;
    if (idValue !== '') {
      this.huespedService.getHuespedId(idValue).subscribe(
        result => {
          if(typeof(result.hue_id) === 'number'){
            this.huespedes = [result];
          }
        },
        error => {
          alert('El huesped no exite');
        }
      );
    }else{
      this.obtenerHuespedes();
    }

  }

  registrarHuesped(){
    let reserva: Reserva = {
      res_fecha_entrada: this.formularioDeReserva.get('fechaInit')?.value,
      res_fecha_salida: this.formularioDeReserva.get('fechaOut')?.value,
      res_forma_pago: this.formularioDeReserva.get('formaDePago')?.value,
      res_valor: this.formularioDeReserva.get('valor')?.value,
      huesped:{
        hue_id: 0
      }
    };
    const objetoSerializado = JSON.stringify(reserva);
    this.router.navigate(['/registro-de-huesped'], { queryParams: { objeto: objetoSerializado } });
  }

}
