import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketsService } from 'src/app/services/websockets.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre=''
  constructor(public wsService:WebsocketsService,
    private router:Router){

  }
  ingresar(){

    this.wsService.loginWS(this.nombre).then(
      ()=>{
          this.router.navigateByUrl('/mensajes')
      }
    )

  }
}
