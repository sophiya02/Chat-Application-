import { AfterViewInit, Injectable } from '@angular/core';
import { WebSocketService } from './web-socket.service';
import { BehaviorSubject, Observable, Subject, map, tap } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Chats } from '../model/models';

const url = "http://localhost:3000/api/v1/channel"

@Injectable({
  providedIn: 'root'
})
export class ChatService{
  socket: Socket;
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor(private authService: AuthService,
    private http: HttpClient) {
      this.socket = io('http://localhost:3000', {
        query: {
          token: this.authService.getToken()
        }
    });

    console.log("socket object", this.socket);
    this.socket.io.on('error', (error)=>{
      console.log("the error is: ", error);
    });
    this.socket.on('connect', ()=>{
      console.log("server is connected")
    })
    this.socket.on('disconnect', (reason)=>{
      console.log("server is disconnected because: ", reason)
    })
    this.socket.on('connect_error', (error)=>{
      console.log("there is a connection error", error)
    })


    // this.socket.io.on('ping', ()=>{
    //   console.log("the destination exist");
    // });
    // this.socket.io.on('close', ()=>{
    //   console.log("the server is closed");
    // });
    // this.socket.io.on('open', ()=>{
    //   console.log("the server is open");
    // });
    // this.socket.io.on('packet', (packet)=>{
    //   console.log("the sent packet is: ", packet);
    // });
    // this.socket.io.on('reconnect', (attempt)=>{
    //   console.log("the reconnect attemp: ", attempt);
    // });
    // this.socket.io.on('reconnect_attempt', (attempt)=>{
    //   console.log("the reconnection attemp: ", attempt);
    // });
    // this.socket.io.on('reconnect_error', (error)=>{
    //   console.log("the reconnect error: ", error);
    // });
    // this.socket.io.on('reconnect_failed', ()=>{
    //   console.log("the reconnect attemp failed: ");
    // });
  }



  public sendMsg(message: any) {
    console.log('sendMsg: ', message)
    this.socket.emit('sendMsg', message);
  }

  public receiveMsg = () => {
    this.socket.on('receiveMsg', (message) =>{
      console.log("the received message from the server: ", message)
      this.message$.next(message);
    });

    return this.message$.asObservable();
  };

  getAllChats(id: string):Observable<Chats[]> {
    console.log('get Chats');
    // this.http.get(`${url}/${id}`).subscribe({
    //   next: (response) => {
    //     console.log('response', response);
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
    return this.http.get(`${url}/${id}/chats`).pipe(
      tap(v=>console.log(v)),
      map(v=> {return(v as any).chats})
    );
  }

  createChat(data:any) {
    console.log('create Chats ');
    this.http.post(`${url}`, data).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

}
