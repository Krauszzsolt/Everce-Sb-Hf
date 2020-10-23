import { HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tokenNotExpired } from "angular2-jwt";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor() {}

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  public getToken(): string {
    return localStorage.getItem("token");
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }

  // public login(
  //   model: AuthenticateRequestDto
  // ): Observable<AuthenticateResponseDto> {
  //   return this.ClienService.user_Authenticate(model).pipe(
  //     tap((x) => {
  //       console.log(x), localStorage.setItem("token", x.token);
  //     })
  //   );
  // }

  // public test(): Observable<UserDto[]> {
  //   return this.ClienService.user_GetAll();
  // }
}
