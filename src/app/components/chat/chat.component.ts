import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  texto = ''
  mensajesSubscription: Subscription = new Subscription();
  mensajes: any[] = []
  elemento!: Element
  constructor(public chatService: ChatService) {
  }
  ngOnInit(): void {

    this.elemento = document.getElementById('chat-mensajes')!
    this.mensajesSubscription = this.chatService.getMessages().subscribe(
      resp => {
        console.log(resp)
        this.mensajes.push(resp)
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight
        }, 100);
      }
    )
  }
  ngOnDestroy(): void {
    this.mensajesSubscription.unsubscribe()
  }
  enviar() {
    if(this.texto.trim().length===0){
      return;
    }
    this.chatService.sendMensaje(this.texto)
    this.texto = ''
  }
}
