import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginDto, RegisterDto, UsersService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];

  constructor(private usersService: UsersService) {}

  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  public retryFailedRequests(): void {
    // retry the requests. this method can
    // be called after the token is refreshed
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    // get the token
    const token = this.getToken();
    // return a boolean reflecting
    // whether or not the token is expired
    return tokenNotExpired(null, token);
  }

  public login(loginDto: LoginDto): Observable<any> {
    return this.usersService.usersAuthenticatePost(loginDto).pipe(
      tap((x) => {
        console.log(x), localStorage.setItem('token', x.token);
      })
    );
  }

  public register(registerDto: RegisterDto): Observable<any> {
    return this.usersService.usersRegisterPost(registerDto).pipe(
      tap((x) => {
        console.log(x)
      })
    );
  }

  // public test(): Observable<UserDto[]> {
  //   return this.ClienService.user_GetAll();
  // }
}