import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/lib/model/models';
import { AuthService } from 'src/lib/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private authService:AuthService ){}

    user_cred = new FormGroup({
      email: new FormControl<string>('', [Validators.required, Validators.email]),
      password: new FormControl<string>('', Validators.required)
    })

    onSubmit(e: Event){
      e.preventDefault()
      const user_data : User = {
        email: this.user_cred.value.email?.toString() as string,
        password : this.user_cred.value.password?.toString() as string
      }
      console.log(user_data)
      // this.authService.registerByUsernamePass(JSON.stringify(user_data)).subscribe({
      //   next: (v) =>  console.log('Response:', v),
      //   error: (error) => console.error('Error:', error)
      // });
      console.log('this.authService.register(user_data) ', this.authService.register(user_data))
    }
  ngOnInit(): void {
  }

}
