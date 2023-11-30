import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, map, tap } from 'rxjs';
import { Chats } from 'src/lib/model/models';
import { ChatService } from 'src/lib/services/chat.service';
import { WebSocketService } from 'src/lib/services/web-socket.service';
import { LayoutBreakpoints } from 'src/lib/shared.resources';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, AfterViewInit {

@Input() channelId=''

  subs = new Subscription();
  input = new FormGroup({
    msg : new FormControl<string | null >(''),
  })

  msgarr: String[]=[];
  msgInit: Observable<Chats[]> = new Observable

  get isDesktopScreen() : boolean {
    return this.breakPointObserver.isMatched([LayoutBreakpoints.DESKTOP])
  }

  get isLargeDesktopScreen() : boolean {
    return this.breakPointObserver.isMatched([LayoutBreakpoints.LARGE_DESKTOP])
  }

  get isMobileScreen() : boolean {
    return this.breakPointObserver.isMatched([LayoutBreakpoints.MOBILE])
  }

  get isTabScreen() : boolean {
    return this.breakPointObserver.isMatched([LayoutBreakpoints.TAB])
  }

  constructor(
    private chatService: ChatService,
    private breakPointObserver: BreakpointObserver,
              private cd: ChangeDetectorRef,
              private route: ActivatedRoute
    ){
      // this.route.url.subscribe((segments) => {
      //   console.log(segments)
      //   const lastSegment = segments[segments.length - 1];
      //   // Extract the channelId from the last segment
      //   const channelId = lastSegment.path;

      //   console.log('Channel ID:', channelId);

      //   // Now you can use the channelId as needed in your component logic
      // });

    }

    ngOnInit(): void {

      this.msgInit= this.chatService.getAllChats(this.channelId)

      this.chatService.receiveMsg().subscribe(
        v=>{ if(v!=='') this.msgarr.push(v)})
    }

  ngAfterViewInit(){
    const subs1 = this.breakPointObserver.observe([
      LayoutBreakpoints.DESKTOP,
      LayoutBreakpoints.LARGE_DESKTOP,
      LayoutBreakpoints.TAB,
      LayoutBreakpoints.MOBILE,
    ]).subscribe(()=> this.cd.markForCheck());

    this.subs.add(subs1);
  }



  sendMsg(event:SubmitEvent){
    event.preventDefault();
    if(this.input.value.msg){

      this.chatService.createChat({msg: this.input.value.msg})
      this.chatService.sendMsg(this.input.value.msg);
      this.input.get('msg')?.reset();


  }

  }




}
