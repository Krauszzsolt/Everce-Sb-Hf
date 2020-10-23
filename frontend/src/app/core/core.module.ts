import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CoreRoutingModule } from "./core-routing.module";
import { LoginComponent } from "./login/login.component";
import { LayoutComponent } from "./layout/layout.component";
import { SharedModule } from "../shared/shared.module";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./service/auth.service";
import { JwtInerceptorService } from "./interceptor/jwt-inerceptor.service";

@NgModule({
  declarations: [LoginComponent, LayoutComponent],
  imports: [CommonModule, CoreRoutingModule, SharedModule],
  providers: [AuthService],
})
export class CoreModule {}
