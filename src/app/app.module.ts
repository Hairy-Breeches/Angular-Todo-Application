import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';
import { AuthInterceptor } from './auth/auth.interceptor';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { LogInComponent } from './auth/log-in/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

const routes: Route[] = [
  { path: '', component: TodoComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent }

]

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoListComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{useClass: AuthInterceptor, multi: true, provide: HTTP_INTERCEPTORS}],
  bootstrap: [AppComponent]
})
export class AppModule { }
