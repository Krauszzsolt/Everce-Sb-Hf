import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  {
    path: "home",
    component: LayoutComponent,
    children: [
      {
        path: "food",
        loadChildren: () =>
          import("./../feature/food/food.module").then((m) => m.FoodModule),
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./../feature/cart/cart.module").then((m) => m.CartModule),
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    redirectTo: "login",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
