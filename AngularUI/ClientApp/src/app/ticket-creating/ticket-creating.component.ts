import { Component, OnInit } from '@angular/core';
import {RepositoryService} from "../shared/services/repository.service";
import {CreatingTicket} from "../viewModels/creatingTicket";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-ticket-creating',
  templateUrl: './ticket-creating.component.html',
  styleUrls: ['./ticket-creating.component.css']
})
export class TicketCreatingComponent implements OnInit {

  public ticket : CreatingTicket = new CreatingTicket();
  public loading : boolean = false;
  public sent : boolean = false;
  public form : FormGroup;
  public submitted : boolean = false;

  constructor(private _repository : RepositoryService, private _router : Router) { }

  public submit(){

    this.loading = true;
    this.ticket= {
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      creatorName: this.form.get('creatorName').value,
      phoneNumber: '+380'+this.form.get('creatorPhone').value
    }
    this._repository.postDataWithoutAutha("api1/tickets", this.ticket).subscribe(result=>
    {
      this.loading=false;
      this.sent=true;
      setTimeout(() => {
        this._router.navigate(['/']);
      },3000);
    });
  }
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(300)]),
      creatorName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(40)]),
      creatorPhone: new FormControl('', [Validators.required, Validators.pattern('^\\d{9}$')]),
    });
  }

}
