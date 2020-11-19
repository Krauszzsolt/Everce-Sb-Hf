import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CaffAddDialogComponent } from '../caff-add-dialog/caff-add-dialog.component';

@Component({
  selector: 'app-caff-list',
  templateUrl: './caff-list.component.html',
  styleUrls: ['./caff-list.component.scss'],
})
export class CaffListComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(CaffAddDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
