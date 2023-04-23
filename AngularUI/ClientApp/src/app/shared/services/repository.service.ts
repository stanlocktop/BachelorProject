
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {firstValueFrom, from} from 'rxjs';
import {environment} from "../../../environments/environment.prod";
import {AuthService} from "./auth.service";
import {UserModel} from "../../viewModels/userModel";
@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor(private http: HttpClient, private _authService: AuthService) { }
  public getData = <T>(route: string) => {
    return from(
      this._authService.getAccessToken()
        .then((token: any) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return firstValueFrom(this.http.get<T>(this.createCompleteRoute(route, environment.baseUrlWebApi), { headers: headers }));
        })
    );
  }

  public postData = (route: string, body: any) => {
      return from(this._authService.getAccessToken()
        .then((token: any) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return firstValueFrom(this.http.post(this.createCompleteRoute(route, environment.baseUrlWebApi), body,{ headers: headers }));
        })
      );
  }
  public postDataWithoutAutha = (route: string, body: any) => {
    return this.http.post(this.createCompleteRoute(route, environment.baseUrlWebApi), body)
    }
  public putData = <T>(route: string, body: any) => {
      return from(this._authService.getAccessToken()
        .then((token: any) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.put<T>(this.createCompleteRoute(route, environment.baseUrlWebApi), body,{ headers: headers }).subscribe();
        }));
  }
  public deleteData = (route: string) => {
      return from(this._authService.getAccessToken()
        .then((token: any) => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.delete(this.createCompleteRoute(route, environment.baseUrlWebApi), {headers: headers}).subscribe();
        }));
  }

  public getUserProfile(username:string){
    return from(this._authService.getAccessToken()
      .then((token: any) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return firstValueFrom(this.http.get<UserModel>(this.createCompleteRoute('profile/'+username, environment.baseUrlIdentityServer), { headers: headers }));
      }))
  }

  public putUserProfile(username:string, body: any) {
    return from(this._authService.getAccessToken()
      .then((token: any) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return firstValueFrom(this.http.put(this.createCompleteRoute('profile/' + username, environment.baseUrlIdentityServer), body, {headers: headers}));
      }));
  }
  private createCompleteRoute = (route: string, envAddress: string) =>    {
    return `${envAddress}/${route}`;
  }
}
