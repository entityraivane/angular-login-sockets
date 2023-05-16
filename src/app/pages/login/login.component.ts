import { Component } from '@angular/core';
import { WebsocketsService } from 'src/app/services/websockets.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre=''
  constructor(public wsService:WebsocketsService){

  }
  ingresar(){

    this.wsService.loginWS(this.nombre)

  }
}
