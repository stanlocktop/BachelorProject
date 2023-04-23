import { Component, OnInit } from '@angular/core';
import {RepositoryService} from "../shared/services/repository.service";
import {Ticket} from "../viewModels/ticket";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  public Tickets : Ticket[];
  public loading:boolean=true;
  public IsAdmin:boolean=false;
  public countTickets:number;
  public pageNo:number=1;
  public pageSize:number=10;
  public pages:number[]=[];
  public usernameParam:string;
  constructor(public _authService : AuthService, private _repository : RepositoryService,
    private _router: Router, private _activatedRoute: ActivatedRoute) {
    this._authService.isAdmin().then(isAdmin=>this.IsAdmin=isAdmin);
  }
  public delete(ticketId:string):void{
    this._repository.deleteData('api1/tickets/'+ticketId).subscribe(next=>
    {
      this.Tickets = this.Tickets.filter(t=>t.id!=ticketId);
      this.getTicketsCount()
    });
  }

  public changePage(pageNo:number):void{
    this.pageNo=pageNo;
    this.getTickets()
  }

  public prevPage():void{
    if(this.pageNo>1)
      this.changePage(this.pageNo-1);
  }

  public nextPage():void {
    if (this.pageNo < this.pages.length)
      this.changePage(this.pageNo + 1);
  }

  public close(ticketId:string):void{
    this._repository.postData('api1/tickets/'+ticketId+'/cancel', {username:this._authService.getUserName()}).subscribe(next=>
    {
      this.Tickets= this.Tickets.filter(t=>t.id!=ticketId);

    });
  };




  public apply(ticketId:string):void{
      this._repository.postData('api1/tickets/'+ticketId+'/take', {username:this._authService.getUserName()}).subscribe(next=>
      {
        this.Tickets= this.Tickets.filter(t=>t.id!=ticketId);
      });
  };
  private initializePages():void{
    let pagesCount = Math.ceil(this.countTickets/this.pageSize);
    this.pages=[];
    for(let i=1;i<=pagesCount;i++)
      this.pages.push(i);
  }

  private getTickets():void {
    this.usernameParam =this._activatedRoute.snapshot.params['username'];
    if(this.usernameParam==null){
      this._repository.getData<Ticket[]>('api1/tickets?PageNumber=' + this.pageNo)
        .subscribe(result => {
          this.Tickets = result
          this.loading=false;},
          error => this._router.navigate(['/']));
    }
    else{
      this._repository.getData<Ticket[]>('api1/'+this.usernameParam+'/tickets?PageNumber=' + this.pageNo)
        .subscribe(result => {
            this.Tickets = result
            this.loading=false;},
          error => this._router.navigate(['/']));
    }
  }

  private getTicketsCount():void {
    let username =this._activatedRoute.snapshot.params['username'];
    if(!username) {
      this._repository.getData<number>('api1/tickets/count').subscribe(result => {
        this.countTickets = result
        this.initializePages()
      });
    }
    else{
      this._repository.getData<number>('api1/tickets/count?username='+username).subscribe(result => {
        this.countTickets = result
        this.initializePages()
      });
    }
  }

  ngOnInit(): void {
    this._authService.loginChanged.subscribe(next=>this._authService.isAdmin().then(isAdmin=>{
      this.IsAdmin=isAdmin;}));
    this.getTickets()
    this.getTicketsCount()

  }

}
