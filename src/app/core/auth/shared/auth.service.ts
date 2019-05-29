import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ISessionParams } from '@app/modules/session/shared';
import { environment } from '@env/environment';
import { IUser } from '@lib/interfaces';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  public checkSession(): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/user/sessions`);
  }

  public login(params: ISessionParams): Observable<IUser> {
    return this.http
      .post<IUser>(`${environment.apiUrl}/user/sessions`, params)
      .pipe(catchError(error => throwError((error.error && error.error.errors) || error)));
  }
}
