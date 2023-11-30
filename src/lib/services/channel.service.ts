import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { ChannelDeatils, Channels } from '../model/models';

const url = 'http://localhost:3000/api/v1/channel'
@Injectable({
  providedIn: 'root'
})
export class ChannelService {

  constructor( private http : HttpClient) { }


  getAllChannels():Observable<Channels[]> {
    console.log('get All Channels');
    // return this.http.get(`${url}`).subscribe({
    //   next: (response) => {
    //     console.log('response', response);
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
    return this.http.get(`${url}`).pipe(
      tap(v=>console.log(v)),
      map(v=> {return (v as any).channels})
    );

  }

  getChannelDetails(id: string):Observable<ChannelDeatils> {
    console.log('get Channels details');
    // this.http.get(`${url}/${id}`).subscribe({
    //   next: (response) => {
    //     console.log('response', response);
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
    return this.http.get(`${url}/${id}`).pipe(
      tap(v=>console.log(v)),
      map(v=> {return(v as any).channelDetail})
    );
  }

  createChannel(data:any) {
    console.log('create Channels ');
    this.http.post(`${url}`, data).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  deleteChannel(id: String) {
    console.log('delete Channels ');
    this.http.delete(`${url}/${id}`).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  joinChannel(id: String) {
    console.log('join Channels ');
    this.http.patch(`${url}/${id}/join-channel`, {}).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  leaveChannel(id: String) {
    console.log('leave Channels ');
    this.http.patch(`${url}/${id}/leave-channel`, {}).subscribe({
      next: (response) => {
        console.log('response', response);
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

}
