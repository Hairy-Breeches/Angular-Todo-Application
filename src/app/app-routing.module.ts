import { NgModule } from '@angular/core';
import { RouterModule, Route, PreloadAllModules } from '@angular/router';

const appRoutes: Route[] = [
  { path: '', redirectTo: 'todos', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./todo/todo.module').then((m) => m.TodoModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
