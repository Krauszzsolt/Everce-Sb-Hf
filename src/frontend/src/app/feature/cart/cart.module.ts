import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CartRoutingModule } from "./cart-routing.module";
import { CartListComponent } from "./cart-list/cart-list.component";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [CartListComponent],
  imports: [CommonModule, CartRoutingModule, SharedModule],
})
export class CartModule {}
