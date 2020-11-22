import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
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
  constructor(public dialog: MatDialog, private caffService: CaffService, private authService: AuthService) {}
  public animations$: Observable<AnimationDto[]>;
  public modifiedTittle = '';
  public API_BASE_URL = environment.API_BASE_URL;
  public user: Observable<ApplicationUserDto> = new Observable();

  ngOnInit() {
    this.animations$ = this.caffService.getAll();
    this.user = this.authService.getUser();
  }

  openDialog() {
    const dialogRef = this.dialog.open(CaffAddDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  public modify(id: number, body?: string) {
    this.caffService.modify(id, body).subscribe(
      (resp) => {
        console.log('siker');
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }

  public delete(id: number) {
    this.caffService.delete(id).subscribe(
      (resp) => {
        console.log('siker');
      },
      (error) => {
        console.log(error.error.message);
      }
    );
  }
}
