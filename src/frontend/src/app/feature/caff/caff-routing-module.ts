import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaffListComponent } from './caff-list/caff-list.component';
import { CaffItemComponent } from './caff-item/caff-item.component';
import { CaffAddDialogComponent } from './caff-add-dialog/caff-add-dialog.component';
import { AuthGuard } from '@src/app/core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CaffListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: CaffItemComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaffRoutingModule {}
