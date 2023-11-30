import { BreakpointObserver } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ChannelDeatils, Channels } from 'src/lib/model/models';
import { AuthService } from 'src/lib/services/auth.service';
import { ChannelService } from 'src/lib/services/channel.service';
import { LayoutBreakpoints } from 'src/lib/shared.resources';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {

  subs= new Subscription();
  user_email: string;
  default_url='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6rmB0BqLfe2I2pTgdeGPLQaD6pWpwPZlf1g'

  channels: Observable<Channels[]>
  channelDetails: ChannelDeatils = {
    channelId: '',
    name: '',
    description:'',
    image_url: '',
    users: []
  };
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

  constructor(private breakPointObserver: BreakpointObserver,
              private cd: ChangeDetectorRef,
              private authService: AuthService,
              private channelService: ChannelService,
              private router: Router
    ){
      this.user_email= this.authService.getUserEmail();

      this.channels = this.channelService.getAllChannels()
    }

    ngOnInit(): void {

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

  toggle(chatList: MatSidenav, chatMembers: MatSidenav){
    chatMembers.open()
    chatList.close();

  }
  back(chatList: MatSidenav, chatMembers: MatSidenav){

    chatList.open();
    chatMembers.close()

  }

  logout(){
    console.log('logout clicked in sidenav')
    this.authService.logout()
  }
  channelId=''
  channelSelected(id: string){
    this.channelService.getChannelDetails(id).subscribe({
      next: (res)=>{
        this.channelDetails = res;
      }
    });
    this.channelId=id;
    this.router.navigate([{ outlets: { channelOutlet: ['channel', id] } }])
  }

}
