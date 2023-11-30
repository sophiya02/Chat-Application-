import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidenavComponent } from './sidenav/sidenav.component';
import { GuardsGuard } from './guards.guard';
import { HomeRouteGuard } from './home-route.guard';
import { ChatRoomComponent } from './chat-room/chat-room.component';

const routes: Routes = [

  // {
  //   path:'chat',
  //   loadChildren: () => import('./profile/profile.module') .then(m => m.ProfileModule)
  // },
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module') .then(m => m.AuthModule)
  },
  {
    path: 'channel',
    component: SidenavComponent,
    canActivate:[HomeRouteGuard]
  },
  {
    path: 'channel/:id',
    component: ChatRoomComponent,
    outlet: 'channelOutlet'
  },
  {path: '', redirectTo: '/auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
