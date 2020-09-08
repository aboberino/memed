import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route } from '@angular/router';
import { AuthService } from '../../auth/service/auth.service';
import { TokenStorageService } from './token-storage.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private tokenStorage: TokenStorageService,
    private userService: UserService
    ) {}

  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | import("rxjs").Observable<boolean> | Promise<boolean> {
    
    if (this.tokenStorage.hasToken()) {
      const tokenDecoded = this.tokenStorage.decodeToken(this.tokenStorage.getToken());
      console.log(tokenDecoded);
      let role = tokenDecoded.role;
      if (role !== 'ADMIN') {
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
    }

    return true;
  }

  // the Router call canActivate() method,
  // if canActivate is registered in Routes[]
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // here we check if user is logged in or not
    // the authService returs user object, or
    // it returns undefined/null when user is not logged in
    if (!this.tokenStorage.getToken()) {
      // just return false - if user is not logged in
      this.router.navigate(['/']);
      return false;
    } else {
      // just return true - if user is logged in
      return true;
    }
  }
}