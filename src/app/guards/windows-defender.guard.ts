import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from '../config/profile.service';

@Injectable({
  providedIn: 'root'
})
export class WindowsDefenderGuard implements CanActivate, CanActivateChild {
  
  constructor(public profileService: ProfileService, public router: Router) {  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(! this.profileService.SearchIsValid)
      this.router.navigate(['']);
    return this.profileService.SearchIsValid ? true : false;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(! this.profileService.SearchIsValid)
      this.router.navigate(['']);
    return this.profileService.SearchIsValid ? true : false;
  }

}
