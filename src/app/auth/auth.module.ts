import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GuardsGuard } from '../guards.guard';

const routes: Routes = [
  {
    path:'login',
    component: LoginComponent,
    title:'login',
    canActivate: [GuardsGuard],
  },
  {
    path:'register',
    component: RegisterComponent,
    title: 'register',
    canActivate: [GuardsGuard],
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
