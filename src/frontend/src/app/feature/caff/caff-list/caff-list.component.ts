import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '@src/app/core/service/auth.service';
import { AnimationDto, ApplicationUserDto } from '@src/app/shared/client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CaffAddDialogComponent } from '../caff-add-dialog/caff-add-dialog.component';
import { CaffService } from '../service/caff.service';

@Component({
  selector: 'app-caff-list',
  templateUrl: './caff-list.component.html',
  styleUrls: ['./caff-list.component.scss'],
})
export class CaffListComponent implements OnInit {
  constructor(public dialog: MatDialog, private caffService: CaffService, private authService: AuthService, private router: Router) {}
  public animations$: Observable<AnimationDto[]>;
  public modifiedTittle = '';
  public API_BASE_URL = environment.API_BASE_URL;
  public user: Observable<ApplicationUserDto> = new Observable();
  ngOnInit() {
    this.animations$ = this.caffService.getAll();
    this.user = this.authService.getUser();
    this.search();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CaffAddDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.animations$ = this.caffService.getAll();
    });
  }

  public modify(id: number, body?: string) {
    this.caffService.modify(id, body).subscribe(
      (resp) => {
        this.animations$ = this.caffService.getAll();
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  public search() {
    this.caffService.getSearchTerm().subscribe((x) => {
      this.animations$ = this.caffService.getAll();
    });
  }

  public delete(id: number) {
    this.caffService.delete(id).subscribe(
      (resp) => {
        this.animations$ = this.caffService.getAll();
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  public detail(id: number) {
    this.router.navigateByUrl(`caff/${id}`);
  }
}
