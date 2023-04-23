import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {environment} from "../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {RepositoryService} from "../shared/services/repository.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public isUserAuthenticated:boolean= false;
  public userName:string="";
  public ticketCount:number=0;
  public myTicketsCount:number=0;
  constructor(private _authService: AuthService, private _activatedRouter: ActivatedRoute, private _repository: RepositoryService) {

  }

  ngOnInit(): void {
    this._authService.isAuthenticated().then(isAuthenticated=>{
      this.isUserAuthenticated=isAuthenticated
      if(isAuthenticated){
        this.userName = this._authService.getUserName();
        setInterval(()=> {
          this._repository.getData<number>('api1/tickets/count').subscribe(res=>{
            this.ticketCount=res;
          });

          this._repository.getData<number>('api1/tickets/count?username='+this.userName).subscribe(res=>{
            this.myTicketsCount=res;
          })
        }, 5000);
      }

    });
    this._authService.loginChanged
      .subscribe(res => {
        this.isUserAuthenticated = res;
        if(res){
          this.userName = this._authService.getUserName();
          setInterval(()=> {
            this._repository.getData<number>('api1/tickets/count').subscribe(res=>{
              this.ticketCount=res;
            });

            this._repository.getData<number>('api1/tickets/count?username='+this.userName).subscribe(res=>{
              this.myTicketsCount=res;
            })
          }, 5000);
        }

      })
  }
  public login = () => {
    this._authService.login();
  }
  public logout = () => {
    this._authService.logout();
  }
  public register = () => {
    this._authService.register();
  }

}
