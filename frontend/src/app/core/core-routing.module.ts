import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'food',
        loadChildren: () => import('./../feature/food/food.module').then((m) => m.FoodModule),
      },
      {
        path: 'cart',
        loadChildren: () => import('./../feature/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'caff',
        loadChildren: () => import('./../feature/caff/caff.module').then((m) => m.CaffModule),
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'registration',
        component: RegistrationComponent,
      },
      {
        path: '',
        redirectTo: 'login',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
