import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: 	string;
  email:  	string;
  refreshToken: 	string;
  expiresIn: 	string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private _tokenExpirationTimer: any;

  AUTH_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHl5hXXRN09Hx8FYIqnBQIsy8RvBhZ_Eo';
  LOGIN_URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHl5hXXRN09Hx8FYIqnBQIsy8RvBhZ_Eo";

constructor(private http: HttpClient, private router: Router) { }

signup(email: string, password: string) : Observable<AuthResponseData> {
  return this.http.post<AuthResponseData>(this.AUTH_URL, {
    email: email,
    password: password,
    returnSecureToken: true
  }).pipe(catchError(this.handleError), tap(this.handleAuth.bind(this)));
}

login(email: string, password: string) : Observable<AuthResponseData>{
  return this.http.post<AuthResponseData>(this.LOGIN_URL, {
    email: email,
    password: password,
    returnSecureToken: true
  }).pipe(catchError(this.handleError), tap(this.handleAuth.bind(this)));
}

autoLogin() {
  const userData: {
    email: string,
    id: string,
    _token: string,
    _tokenExpirationDate: string,
  } = JSON.parse(localStorage.getItem('userData'));

  if(!userData) {
    return;
  }

  const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

  if(loadedUser.token) {
    this.user.next(loadedUser);
    const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
    this.autoLogout(expirationDuration * 1000);
  }
}

logout() {
  this.user.next(null);
  this.router.navigate(['/auth']);
  localStorage.removeItem('userData');
  if(this._tokenExpirationTimer) {
    clearTimeout(this._tokenExpirationTimer);
  }

  this._tokenExpirationTimer = null;
}

autoLogout(expirationDuration: number) {
  this._tokenExpirationTimer = setTimeout(() => {
    this.logout(); //Nie wiem czemu po prxelogowaniu metoda jest wywoływana przez timer choć wg mnie nie powinna!!!
  }, expirationDuration);
}

private handleAuth(resData: AuthResponseData) {
    const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(resData.email, resData.localId, resData.idToken, expirationDate);

    this.user.next(user);
    this.autoLogout(+resData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
}

private handleError(errorRes: HttpErrorResponse) {
  let errorMessage = 'An unknown error occured!';
    if(!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = "Email already exists in database!";
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "Email wasn't found in the database!";
        break;
        case 'INVALID_PASSWORD':
        errorMessage = "User or password is invalid!";
        break;
    }

    return throwError(errorMessage);
}

}
