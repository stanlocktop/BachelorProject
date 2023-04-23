import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { RepositoryService } from '../shared/services/repository.service';
import { Ticket } from '../viewModels/ticket';
import {TicketUpdating} from "../viewModels/ticketUpdating";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-editing-ticket',
  templateUrl: './editing-ticket.component.html',
  styleUrls: ['./editing-ticket.component.css']
})
export class EditingTicketComponent implements OnInit {

  public TicketId: string = '';
  public Ticket: Ticket= new Ticket();
  public form : FormGroup;
  public submitted: boolean = false;
  public loading : boolean = true;
  constructor(private _authService : AuthService, private _activatedRoute : ActivatedRoute, private _repository : RepositoryService,
    private _router : Router) {
     }

  ngOnInit(): void {

    this.TicketId = this._activatedRoute.snapshot.params['id'];
    this._repository.getData<Ticket>('api1/tickets/'+this.TicketId).subscribe(next=>
    {
      if(!next)
        this._router.navigate(['/tickets']);
      this.Ticket = next;
      this.form.controls['title'].setValue(this.Ticket.title);
      this.form.controls['description'].setValue(this.Ticket.description);
      this.form.controls['creatorName'].setValue(this.Ticket.creatorName);
      this.form.controls['creatorPhone'].setValue(this.Ticket.creatorPhone);
      this.form.controls['ownerUsername'].setValue(this.Ticket.ownerUsername);
      this.form.controls['created'].setValue(this.Ticket.created);
      this.loading = false;
    });
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]),
      creatorName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      creatorPhone: new FormControl('', [Validators.required, Validators.pattern('^\\d{9}$')]),
      ownerUsername: new FormControl('', [Validators.minLength(5), Validators.maxLength(40)]),
      created: new FormControl('', [Validators.required]),
    });

  }
    public save():void{
    let ticketUpdatingModel =  {
      title: this.form.controls['title'].value,
      description: this.form.controls['description'].value,
      creatorName: this.form.controls['creatorName'].value,
      phoneNumber: this.form.controls['creatorPhone'].value,
      ownerUsername: this.form.controls['ownerUsername'].value,
      created: this.form.controls['created'].value
    };
      this._repository.putData('api1/tickets/'+this.TicketId,ticketUpdatingModel).subscribe(next=>
      {
        this._router.navigate(['/tickets']);
      });
    }

}

