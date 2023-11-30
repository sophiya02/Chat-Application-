import { Component } from '@angular/core';
import { ChatService } from 'src/lib/services/chat.service';
import { WebSocketService } from 'src/lib/services/web-socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chat-app';
  // constructor(private chatService: ChatService){

  // }
}
