import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/models';
import { Router } from '@angular/router';

const url = "http://localhost:3000/api/v1/auth"
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient,
    private router: Router) { }


    login(data: User) {
      console.log('login data', data)
      return this.http.post(`${url}/login`, data, {withCredentials: true}).subscribe({
        next: (response) => {
          console.log('response', response);
          this.setLocalStorage(response);
          this.router.navigate(['/home'])
        },
        error: (err) => {
          console.log('err', err);
        },
      });
    }
    register(data: User) {
      console.log('data in auth reg', data);
      return this.http.post(`${url}/register`, data, {withCredentials: true}).subscribe({
        next: (response) => {
          console.log('response', response);
          this.router.navigate([`/auth/login`]);
        },
        error: (err) => {
          console.log('err', err);
        },
      });
    }

    logout() {
      console.log('logout clicked in sidenav');
      this.removeLocalStorage();
      this.http.get(`${url}/logout`, {withCredentials: true}).subscribe({
        next: (response) => {
          console.log('response', response);
        },
        error: (err) => {
          console.log('err', err);
        },
      });
      this.router.navigate([`/auth/login`]);
    }

    setLocalStorage(res: any) {
      let value = {
        token: res.token,
        maxAge: Date.now() + res.maxAge,
      };
      localStorage.setItem('user_email', JSON.stringify(res.email));
      localStorage.setItem('user_token', JSON.stringify(value));
    }

    removeLocalStorage(){
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_token");
    }

    isLoggedIn():  boolean {
      let tokenString = localStorage.getItem('user_token');
      if(!tokenString) {
        console.log("no token string");
        return false;
      }
      else{
        let res = (JSON.parse(tokenString).maxAge + Date.now()) > Date.now();
        console.log("valid token string ", res);
        return true;
      }

    }

    isLoggedOut() : boolean{
      return !this.isLoggedIn();
    }

    getExpiration() {
      let tokenString = localStorage.getItem('user_token');
      if (tokenString) return JSON.parse(tokenString).maxAge;
    }

    getToken(){
      let tokenString = localStorage.getItem('user_token')
      return tokenString? JSON.parse(tokenString).token: null;
    }
    getUserEmail(){
      let email = localStorage.getItem('user_email')
      return email? email: '';
    }
}
