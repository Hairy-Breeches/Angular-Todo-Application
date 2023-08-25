import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { TodoComponent } from './todo.component';

import { AuthGuard } from '../route.guards';

const todoRoutes: Route[] = [
  { path: '', component: TodoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(todoRoutes)],
  exports: [RouterModule],
})
export class TodoRoutingModule {}
