import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.authService.token as string

    let toHandle = request

    // si je ne suis pas sur une des routes 'security'
    if (!request.url.includes('security')){
      toHandle = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`)
      })
    }


    return next.handle(toHandle);
  }
}
