import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {
  public socketStatus = false
  constructor(private socket: Socket) {
    this.checkstatus()
  }
  checkstatus() {
    this.socket.on('connect', () => {
      console.log('conectado al servidor')
      this.socketStatus = true
    })
    this.socket.on('disconnect', () => {
      console.log('desconectado al servidor')
      this.socketStatus = false
    })
  }
}
