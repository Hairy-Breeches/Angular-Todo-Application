import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

const appRoutes: Route[] = [];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
