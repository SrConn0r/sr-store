import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap, tap } from 'rxjs/operators';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl: string = `${environment.API_URL}auth`;

  constructor(
    private http : HttpClient,
    private tokenService: TokenService
  ) { }

  login(email:string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password}).pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
      })
    );
  }

  profile(){
    //First way
    /* const headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${token}`); */
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      //Second way
      /* headers:{
        Authorization: `Bearer ${token}`,
      } */
    });
  }

  loginAndGet(email: string, password:string){
    return this.login(email, password).pipe(
      switchMap(rta => this.profile()),
    )
  }
}
