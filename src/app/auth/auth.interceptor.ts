import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, exhaustMap, map, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.pipe(
      take(1),
      map((state) => {
        return state.auth;
      }),
      exhaustMap((authState) => {
        if (!authState.token) return next.handle(req);

        const cloneReq = req.clone({
          headers: req.headers.set(
            'Authorization',
            'Bearer ' + authState.token
          ),
        });

        return next.handle(cloneReq);
      })
    );
  }
}
