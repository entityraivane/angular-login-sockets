import { Injectable } from '@angular/core';
import { WebsocketsService } from './websockets.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketsService) { }
  sendMensaje(mensaje: string) {
    const payload = {
      de: this.wsService.usuario.nombre,
      cuerpo: mensaje
    }
    this.wsService.emit('mensaje', payload)
  }
  getMessages() {
    return this.wsService.listen('mensaje-nuevo')
  }
  getMessagesPrivado() {
    return this.wsService.listen('mensaje-privado')
  }
  getUsuariosActivos() {
    return this.wsService.listen('usuarios-activos')
  }
  emitirUsuariosActivos() {
    this.wsService.emit('obtener-usuarios')
  }
}
