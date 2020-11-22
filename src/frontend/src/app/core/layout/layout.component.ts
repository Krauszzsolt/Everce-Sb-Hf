import { Component, OnInit } from '@angular/core';
import { CaffService } from '@src/app/feature/caff/service/caff.service';
import { ApplicationUserDto } from '@src/app/shared/client';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService, private caffService: CaffService) {}
  public user: Observable<ApplicationUserDto> = new Observable();
  public showFiller = false;
  public search = '';
  ngOnInit() {
    this.user = this.authService.getUser();
  }

  public searchEvetn() {
    this.caffService.setSearchTerm(this.search);
  }

  public logout() {
    this.authService.logout();
  }
}
