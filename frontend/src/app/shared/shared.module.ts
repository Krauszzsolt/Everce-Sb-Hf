import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MatCardModule } from '@angular/material/card';
import { LayoutModule } from '@angular/cdk/layout';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    NgMatSearchBarModule,
    MatCardModule,
    LayoutModule,
    MatDialogModule, 
  ],
  exports: [
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    NgMatSearchBarModule,
    MatCardModule,
    LayoutModule,
    MatDialogModule, 
  ],
})
export class SharedModule {}
