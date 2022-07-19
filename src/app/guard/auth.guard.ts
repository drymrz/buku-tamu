import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { iif, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  userData;
  userRole;
  userName;
  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.userData = sessionStorage.getItem('token');
    this.userRole = sessionStorage.getItem('role');
    this.userName = sessionStorage.getItem('usn');

    if (!this.userData) {
      this.router.navigate(['../../../auth']);
      sessionStorage.clear();
    }

    if (this.userRole === "operator") {
      this.router.navigate(['../../form']);
    }

    // if (this.userData) {
    //   setTimeout(() => {
    //     if (!this.userName) {
    //       this.router.navigate(['../../../auth']);
    //       sessionStorage.clear();
    //     }
    //   }, 5000);
    // }


    return true;
  }
}
