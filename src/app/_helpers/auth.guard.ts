import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CookieStorageService } from ".";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router:Router,
        private cookie: CookieStorageService,
        private jwt: JwtHelperService,
        private authService: AuthService
    ){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
        const token = this.cookie.getToken();
        if(token){
            if(!this.jwt.isTokenExpired(token)){
                return true;
            }
            this.router.navigate(['/account/login']);
            return false;
        }

        return true;
    }
}

