import { Injectable } from '@angular/core';
import {UserManager, User, UserManagerSettings, Profile} from 'oidc-client';
import {Subject} from "rxjs";
import {environment} from "../../../environments/environment.prod";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userManager: UserManager;
  private _user!: User;
  private _loginChangedSubject = new Subject<boolean>();
  public loginChanged = this._loginChangedSubject.asObservable();
  private get idpSettings() : UserManagerSettings {
    return {
      authority: environment.baseUrlIdentityServer,
      client_id: "angular.client",
      client_secret:"secret",
      redirect_uri: environment.baseUrlUi+`/signin-callback`,
      scope: "openid profile api1 role",
      response_type: "code",
      post_logout_redirect_uri: environment.baseUrlUi+`/signout-callback`,
    }
  }
  public login = () => {
    this._userManager.startSilentRenew()
    return this._userManager.signinRedirect();
  }
  public register = () => {
    return this._userManager.signinRedirect({extraQueryParams:{registration:true}});
  }
  public finishLogin = (): Promise<User> => {
    return this._userManager.signinRedirectCallback()
      .then(user => {
        this._user = user;
        this._loginChangedSubject.next(this.checkUser(user));
        return user;
      })
  }
  public isAuthenticated = (): Promise<boolean> => {
    return this._userManager.getUser()
      .then(user => {
        if(this._user !== user){
          this._loginChangedSubject.next(this.checkUser(user));
        }
        this._user = user;
        return this.checkUser(user!);
      })
  }
  public isAdmin= (): Promise<boolean> => {
    return this._userManager.getUser().then(user => {
    return this.checkUser(user!) && user.profile['role'] === "Admin";
  })
}
  private checkUser = (user : User): boolean => {
    return !!user && !user.expired;
  }
  constructor() {
    this._userManager = new UserManager(this.idpSettings);
    this._userManager.events.addUserSignedOut(()=>{
      this._loginChangedSubject.next(false);
      this._userManager.removeUser();
      this._userManager.stopSilentRenew()
    })
    this._userManager.events.addAccessTokenExpired(()=>{
      this._userManager.removeUser();
      this._loginChangedSubject.next(false);
      this._userManager.stopSilentRenew()
    })
  }
  public logout = () => {
    window.location.replace(environment.baseUrlIdentityServer+'/Account/logoutWithReturnUrl?returnUrl='+environment.baseUrlUi);
    this._userManager.removeUser();
    this._userManager.stopSilentRenew()
  }
  public finishLogout = () => {
    this._user = null!;
    return this._userManager.signoutRedirectCallback();
  }
  public getAccessToken = (): Promise<string> => {
    return this._userManager.getUser()
      .then(user => {
        return !!user && !user.expired ? user.access_token : null;
      })
  }
  public getUserName():string{
    return this._user?.profile['name']??'';
  }

  public getUserId = (): Promise<string> => {
    return this._userManager.getUser()
      .then(user => {
        return !!user && !user.expired ? user.profile.sub : null;
      })
  }
  public getClaims = (): Promise<string | Profile> => {
    return this._userManager.getUser()
      .then(user => {
        console.log(user.profile)
        return !!user && !user.expired ? user.profile : null;
      })
  }
  public getUserProfileFullAddress():string{
    return this._userManager.settings.authority + "/profile";
  }
}
