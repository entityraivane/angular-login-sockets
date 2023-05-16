import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class WebsocketsService {
  public socketStatus = false
  public usuario: Usuario = new Usuario('')
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
  emit(evento: string, payload?: any, callback?: Function) {
    console.log('emitiendo evento', evento)
    this.socket.emit(evento, payload, callback)

  }
  listen(evento: string) {
    return this.socket.fromEvent(evento)

  }
  loginWS(nombre: string) {
    this.emit('configurar-usuario',{nombre},(resp:any)=>{
      console.log(resp)
    })

  }
}
