import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject} from 'rxjs';
import {Socket, io} from 'socket.io-client'


@Injectable({
  providedIn: 'root'
})
export class WebSocketService implements OnInit{

  constructor() {
  }
  ngOnInit(){}



}
