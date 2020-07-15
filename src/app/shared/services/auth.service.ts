import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthInterface } from '../interfaces/auth.interface';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private currentUserSubject: BehaviorSubject<AuthInterface>;
    public currentUser: Observable<AuthInterface>;

    // private isLoggedIn = new BehaviorSubject(false);
    // public currentIsLoggedIn = this.isLoggedIn.asObservable();

    private localStorageUserData = 'currentUser';

    private authApiUrl = 'https://reenbit-chuck-norris.azurewebsites.net/api/auth';

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<AuthInterface>(JSON.parse(localStorage.getItem(this.localStorageUserData)));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): AuthInterface {
        return this.currentUserSubject.value;
    }

    public login(data: object): Observable<AuthInterface> {
        return this.http.post<AuthInterface>(`${this.authApiUrl}/signin`, data)
            .pipe(
                map((response: AuthInterface) => {
                    if (response && response.token) {
                        localStorage.setItem(this.localStorageUserData, JSON.stringify(response));
                        this.currentUserSubject.next(response);
                    }
                    return response;
                })
            );
    }

    public register(data: object): Observable<boolean> {
        return this.http.post<boolean>(`${this.authApiUrl}/signup`, data);
    }

    public logout(): void {
        localStorage.removeItem(this.localStorageUserData);
        this.currentUserSubject.next(null);
    }

    // public changeLoggInState(state: boolean): void {
    //     this.isLoggedIn.next(state);
    // }
}
