import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";

import { AuthService } from "../service/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class JwtInerceptorService implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(this.auth.getToken());
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`,
      },
      withCredentials: true,
    });
    return next.handle(request);
  }
}
