import { Injectable } from '@angular/core';
import { WebsocketsService } from './websockets.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(public wsService: WebsocketsService) { }
  sendMensaje(mensaje: string) {
    const payload = {
      de: 'Milton',
      cuerpo: mensaje
    }
    this.wsService.emit('mensaje', payload)
  }
  getMessages() {
    return this.wsService.listen('mensaje-nuevo')
  }
}
