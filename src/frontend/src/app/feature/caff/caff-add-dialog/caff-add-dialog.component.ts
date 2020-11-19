import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-caff-add-dialog',
  templateUrl: './caff-add-dialog.component.html',
  styleUrls: ['./caff-add-dialog.component.scss'],
})
export class CaffAddDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<CaffAddDialogComponent>) {}

  ngOnInit() {}
  progress;

  isUploading;

  close() {
    this.dialogRef.close('Pizza!');
  }

  add() {}

  onUpload() {}

  onChange() {}
}
