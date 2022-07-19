import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildGuardGuard implements CanActivateChild {
  userData: string;
  constructor(private router: Router) { }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.userData = sessionStorage.getItem('token');
    if (!this.userData) {
      this.router.navigate(['../../../auth']);
      sessionStorage.clear();
    }
    return true;
  }

}
