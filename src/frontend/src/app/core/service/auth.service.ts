import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApplicationUserDto, LoginDto, RegisterDto, UsersService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  cachedRequests: Array<HttpRequest<any>> = [];

  private currentUserSubject: BehaviorSubject<ApplicationUserDto>;

  constructor(private usersService: UsersService) {
    this.currentUserSubject = new BehaviorSubject<ApplicationUserDto>(JSON.parse(localStorage.getItem('currentUser')));
  }

  public get currentUserValue(): ApplicationUserDto {
    console.log('currentUserValue', this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

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

  public login(loginDto: LoginDto): Observable<ApplicationUserDto> {
    return this.usersService.usersAuthenticatePost(loginDto).pipe(
      tap((x) => {
        console.log(x);
        localStorage.setItem('token', x.token);
        localStorage.setItem('currentUser', JSON.stringify(x));
        this.currentUserSubject.next(x);
        console.log(this.currentUserValue);
      })
    );
  }

  public register(registerDto: RegisterDto): Observable<any> {
    return this.usersService.usersRegisterPost(registerDto).pipe(
      tap((x) => {
        console.log(x);
      })
    );
  }

  // public test(): Observable<UserDto[]> {
  //   return this.ClienService.user_GetAll();
  // }
}
