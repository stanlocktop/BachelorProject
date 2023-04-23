import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RepositoryService} from "../shared/services/repository.service";
import {UserModel} from "../viewModels/userModel";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public profile : UserModel=new UserModel();
  public loggedUserName : string;
  private isAdmin:boolean;
  loading: boolean = true;
  constructor(private _authService : AuthService, private _activatedRoute: ActivatedRoute,
              private _router : Router, private _repository : RepositoryService) {
    this._authService.isAdmin().then(isAdmin=>this.isAdmin=isAdmin);
  }
  ngOnInit(): void {
    this._authService.loginChanged.subscribe(next=>
    {
        this._authService.isAdmin().then(isAdmin=>{this.isAdmin=isAdmin;})
        this.loggedUserName =this._authService.getUserName();
    });
    this.loggedUserName =this._authService.getUserName();
    this._repository.getUserProfile(this._activatedRoute.snapshot.params['username']).subscribe(result=> {
      this.profile=result
      this.loading=false;
    },error => {
      this._router.navigate(['/']);
    });
  }

}
