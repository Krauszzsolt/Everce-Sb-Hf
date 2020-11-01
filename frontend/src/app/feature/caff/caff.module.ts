import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaffListComponent } from './caff-list/caff-list.component';
import { CaffRoutingModule } from './caff-routing-module';

@NgModule({
  declarations: [CaffListComponent],
  imports: [
    CommonModule,
    CaffRoutingModule,
  ]
})
export class CaffModule { }
