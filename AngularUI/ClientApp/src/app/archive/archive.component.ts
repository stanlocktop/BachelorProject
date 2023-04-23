import { Component } from '@angular/core';
import {Ticket} from "../viewModels/ticket";
import {AuthService} from "../shared/services/auth.service";
import {RepositoryService} from "../shared/services/repository.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent {

  public Tickets : Ticket[];
  public loading:boolean=true;
  public IsAdmin:boolean=false;
  public usernameParam:string;
  constructor(public _authService : AuthService, private _repository : RepositoryService,
              private _router: Router, private _activatedRoute: ActivatedRoute) {
    this._authService.isAdmin().then(isAdmin=>this.IsAdmin=isAdmin);
  }

  private getTickets():void {
    this.usernameParam =this._activatedRoute.snapshot.params['username'];
    if(this.usernameParam==null)
      return;
      this._repository.getData<Ticket[]>('api1/tickets/cancelled?username='+this.usernameParam)
        .subscribe(result => {
            this.Tickets = result
            this.loading=false;},
          error => this._router.navigate(['/']));
  }


  ngOnInit(): void {
    this.getTickets()
  }

}
