import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaffListComponent } from './caff-list/caff-list.component';
import { CaffItemComponent } from './caff-item/caff-item.component';
import { CaffAddDialogComponent } from './caff-add-dialog/caff-add-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: CaffListComponent,
  },
  {
    path: 'item',
    component: CaffItemComponent,
  },
  // {
  //     path: "dialog",
  //     component: CaffAddDialogComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaffRoutingModule {}
