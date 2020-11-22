import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaffListComponent } from './caff-list/caff-list.component';
import { CaffRoutingModule } from './caff-routing-module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaffItemComponent } from './caff-item/caff-item.component';
import { CaffAddDialogComponent } from './caff-add-dialog/caff-add-dialog.component';
import { CaffService } from './service/caff.service';

@NgModule({
  declarations: [CaffListComponent, CaffItemComponent, CaffAddDialogComponent],
  entryComponents: [CaffAddDialogComponent],
  imports: [CommonModule, CaffRoutingModule, SharedModule],
})
export class CaffModule {}
