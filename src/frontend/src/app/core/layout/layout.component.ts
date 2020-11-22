import { Component, OnInit } from '@angular/core';
import { ApplicationUserDto } from '@src/app/shared/client';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService) {}
  public user: Observable<ApplicationUserDto> = new Observable();
  public showFiller = false;
  ngOnInit() {
    this.user = this.authService.getUser();
  }
}
