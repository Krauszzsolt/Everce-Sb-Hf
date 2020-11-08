import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaffListComponent } from './caff-list/caff-list.component';
import { CaffRoutingModule } from './caff-routing-module';
import { SharedModule } from "src/app/shared/shared.module";


@NgModule({
  declarations: [CaffListComponent],
  imports: [
    CommonModule,
    CaffRoutingModule,
    SharedModule
  ]
})
export class CaffModule { }
