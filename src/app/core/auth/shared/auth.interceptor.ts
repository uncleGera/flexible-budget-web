import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthState } from '@app/core/auth/state/auth.state';
import { environment } from '@env/environment';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Skip third-party requests
    if (!request.url.includes(environment.apiUrl)) {
      return next.handle(request);
    }

    const user = this.store.selectSnapshot(AuthState.user);

    if (user && user.token) {
      // clone and modify the request
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    return next.handle(request);
  }
}
