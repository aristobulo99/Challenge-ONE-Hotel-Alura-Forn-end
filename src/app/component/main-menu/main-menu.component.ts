import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent {

  constructor(
    private router: Router
  ){}

  buttonLogin(){
    this.router.navigateByUrl('/login');
  }

}
