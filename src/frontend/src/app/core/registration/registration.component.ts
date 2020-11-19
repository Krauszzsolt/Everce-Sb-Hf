import { Component, OnInit } from '@angular/core';
import { RegisterDto } from 'src/app/shared/client';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  registerDto: RegisterDto = {
    username: '',
    password: '',
    confirmPassword: ''
  };

  errorMessage: string = undefined;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  registration() {
    this.authService.register(this.registerDto).subscribe(
      (resp) => {
        console.log(resp);
      },
      (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
      }
    );
  }
}
