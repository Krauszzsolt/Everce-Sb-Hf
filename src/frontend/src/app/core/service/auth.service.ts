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
    return this.currentUserSubject.value;
  }

  public getUser(): Observable<ApplicationUserDto> {
    return this.currentUserSubject.asObservable();
  }

  public getToken(): string {
    return localStorage.getItem('token');
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

}
