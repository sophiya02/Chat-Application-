import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/lib/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeRouteGuard implements CanActivate {
  constructor(private authService: AuthService,
    private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.authService.isLoggedOut()) {
        // User is logged in, redirect to the default route (e.g., /)
        console.log("user logged Out")
        return this.router.navigate(['/auth/login']) // Change '/' to your default route
      }
      else
      return this.authService.isLoggedIn();
  }

}
