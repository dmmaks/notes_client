import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CookieStorageService } from ".";
import { AuthService } from "../_services";

@Injectable({providedIn: 'root'})
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService,
        private cookie: CookieStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.cookie.getToken();
        const isApiUrl = request.url.startsWith(environment.serverUrl);
        if (token && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
        }

        return next.handle(request);
    }
}
