import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/lib/model/models';
import { AuthService } from 'src/lib/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService ){}

  user_cred = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', Validators.required)
  })

  onSubmit(e: Event){
    e.preventDefault()
    const user_data: User = {
      email: this.user_cred.value.email?.toString() as string,
      password : this.user_cred.value.password?.toString() as string
    }
    console.log('this.authService.login(user_data) ', this.authService.login(user_data))
  }

  ngOnInit(): void {
  }

}
