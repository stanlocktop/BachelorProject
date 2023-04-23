import { Component, OnInit } from '@angular/core';
import {RepositoryService} from "../shared/services/repository.service";
import {UserModel} from "../viewModels/userModel";
import {ActivatedRoute, Router} from "@angular/router";
import {UserViewModel} from "../viewModels/userViewModel";
import {AuthService} from "../shared/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile-editing',
  templateUrl: './profile-editing.component.html',
  styleUrls: ['./profile-editing.component.css']
})
export class ProfileEditingComponent implements OnInit {

  public Profile :UserModel=new UserModel();
  public viewModel : UserViewModel=new UserViewModel();
  form:FormGroup;
  loading:boolean=true;
  submitted:boolean=false;
  constructor(private _authService : AuthService, private _activatedRoute : ActivatedRoute, private _repository : RepositoryService, private _router : Router) {
    if(this._activatedRoute.snapshot.params['username']!=this._authService.getUserName())
      this._router.navigate(['/']);
  }

  public submit():void {
    this.loading=true;

    this._repository.putUserProfile(this.Profile.username, {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      phoneNumber: '+380' + this.form.get('phoneNumber').value
    }).subscribe(next => {
      this._router.navigate([ '/',this._activatedRoute.snapshot.params['username'],'profile', ]);
    });
  }
  public back():void {
    this._router.navigate([ '/',this._activatedRoute.snapshot.params['username'],'profile', ]);
  }
  ngOnInit(): void {
    this._repository.getUserProfile(this._activatedRoute.snapshot.params['username']).subscribe(result=>
    {
      this.Profile=result
      this.form=new FormGroup({
        firstName: new FormControl(this.Profile.fullName?.substring(0, this.Profile.fullName?.indexOf(' ')),[Validators.required,Validators.minLength(3), Validators.maxLength(40)]),
        lastName: new FormControl(this.Profile.fullName?.substring(this.Profile.fullName?.indexOf(' ')+1),[Validators.required,Validators.minLength(3), Validators.maxLength(40)]),
        phoneNumber: new FormControl(this.Profile.phoneNumber?.replace('+380',''),[Validators.required, Validators.pattern('^\\d{9}$')]),
      });
      this.loading=false;
    },
        error=>this._router.navigate(['/']));
  }

}
