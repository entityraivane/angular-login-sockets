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
    this.cargarStorage()
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
  getUsuario(){
    if(this.usuario.nombre==''){
      return null
    }else{
       return this.usuario
    }

  }
  listen(evento: string) {
    return this.socket.fromEvent(evento)

  }
  loginWS(nombre: string) {
    return new Promise(
      (resolve, reject) => {
        this.emit('configurar-usuario', { nombre }, (resp: any) => {
          this.usuario = new Usuario(nombre)
          this.guardarStorage()
          resolve(nombre)
        })
      }
    )
  }
  guardarStorage() {
    localStorage.setItem('usuario', JSON.stringify(this.usuario))
  }
  cargarStorage() {
    if (localStorage.getItem('usuario')) {

      this.usuario = JSON.parse(localStorage.getItem('usuario') || '')
      this.loginWS(this.usuario.nombre)
    }
  }
}
