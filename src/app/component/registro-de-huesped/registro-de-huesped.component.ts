import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Huesped, RegistroHUesped } from 'src/app/interfaces/huesped.interface';
import { Reserva, ReservaHuesped } from 'src/app/interfaces/reserva.interface';
import { HuespedService } from 'src/app/service/huesped.service';
import { ReservasService } from 'src/app/service/reservas.service';

@Component({
  selector: 'app-registro-de-huesped',
  templateUrl: './registro-de-huesped.component.html',
  styleUrls: ['./registro-de-huesped.component.scss']
})
export class RegistroDeHuespedComponent implements OnInit {

  public formHuesped: FormGroup = new FormGroup({});
  public objetoRecibido!: ReservaHuesped;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private huespedService: HuespedService,
    private reservaService: ReservasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerReserva();
    this.generarFormHuesped();
  }

  obtenerReserva(){
    this.route.queryParams.subscribe((queryParams) => {
      const objetoSerializado = queryParams['objeto'];
      if (objetoSerializado) {
        this.objetoRecibido = JSON.parse(objetoSerializado);
        console.log('Objeto recibido:', this.objetoRecibido);
      }
    });
  }

  generarFormHuesped(){
    this.formHuesped = this.fb.group(
      {
        nombre: new FormControl<string>('', [Validators.required]),
        apellido: new FormControl<string>('', [Validators.required]),
        fechaNacimiento: new FormControl<Date|null>(null, [Validators.required]),
        nacionalidad: new FormControl('',[Validators.required]),
        telefono: new FormControl('',[Validators.required])
      }
    );
  }

  registrarHuesped(){
    if(this.formHuesped.valid){
      let huesped: RegistroHUesped = {
        hue_nom: this.formHuesped.get('nombre')?.value,
        hue_ape: this.formHuesped.get('apellido')?.value,
        hue_fec_nac: this.formHuesped.get('fechaNacimiento')?.value,
        hue_nacionalidad: this.formHuesped.get('nacionalidad')?.value,
        hue_telf: this.formHuesped.get('telefono')?.value
      }
      this.huespedService.postHuesped(huesped).subscribe(
        result => {
          if(typeof(result.hue_id) === 'number'){
            this.objetoRecibido.huesped.hue_id = result.hue_id;
            this.reservaService.postReservasion(this.objetoRecibido).subscribe(
              resultado => {
                if(typeof(resultado.res_id) === 'number'){
                  this.router.navigateByUrl('menu-de-usuario');
                }
              }
            );
          }
        }
      );
    }else{
      alert('Por favor llenar todos los campos');
    }
  }

  clickBack(){
    this.router.navigateByUrl('registro-de-reserva');
  }


}
