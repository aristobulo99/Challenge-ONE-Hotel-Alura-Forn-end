import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/interfaces/auth.interface';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authSerice: AuthService
  ){}

  ngOnInit(): void {
    this.generarFormLogin();

  }

  generarFormLogin(): void{
    this.formLogin = this.fb.group(
      {
        usuario: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
      }
    );
  }

  login(){
    if(this.formLogin.valid){
      let auth: Auth = {
        usuario: this.formLogin.get('usuario')?.value,
        contraseña: this.formLogin.get('password')?.value
      }
      this.authSerice.postAuth(auth).subscribe(result => {
        if(result){
          this.router.navigateByUrl('/menu-de-usuario');
        }else{
          alert('Usuario y Contraseña inválidos')
        }
      });
    }else{
      alert('Por favor llenar todos los campos')
    }
  }

}
