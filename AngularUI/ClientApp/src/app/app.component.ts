import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';
  public isHomePath:boolean=false;
  constructor(private _authService: AuthService, private _activatedRouter: ActivatedRoute, private _router : Router){
  }

  ngOnInit(): void {
    this._router.events.subscribe(res=>{
      this.isHomePath=this._router.url.includes('#') || this._router.url == '' || this._router.url == '/';
    })
  }
}
