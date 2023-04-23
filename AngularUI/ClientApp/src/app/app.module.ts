import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule} from "@angular/common/http";
import { SigninRedirectCallbackComponent } from './signin-redirect-callback/signin-redirect-callback.component';
import {RouterModule, Routes} from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { SignoutRedirectCallbackComponent } from './signout-redirect-callback/signout-redirect-callback.component';
import {AuthGuard} from "./infrastructure/AuthGuard";
import { TicketsComponent } from './tickets/tickets.component';
import { TicketCreatingComponent } from './ticket-creating/ticket-creating.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditingTicketComponent } from './editing-ticket/editing-ticket.component';
import { AdminGuard } from './infrastructure/AdminGuard';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditingComponent } from './profile-editing/profile-editing.component';
import {NgOptimizedImage} from "@angular/common";
import { ArchiveComponent } from './archive/archive.component';
//add routes
const routes : Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'signin-callback',
    component: SigninRedirectCallbackComponent,
  },
  { path: 'signout-callback', component: SignoutRedirectCallbackComponent },
  { path: 'ticket/create', component: TicketCreatingComponent },
  { path: 'tickets', component: TicketsComponent, canActivate: [AuthGuard]},
  { path: ':username/tickets', component: TicketsComponent, canActivate: [AuthGuard]},
  { path: ':username/profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: ':username/profile/edit', component: ProfileEditingComponent, canActivate: [AuthGuard]},
  { path: 'ticket/edit/:id', component: EditingTicketComponent, canActivate: [AuthGuard, AdminGuard]},
  {path:':username/archive', component: ArchiveComponent, canActivate: [AuthGuard]},
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninRedirectCallbackComponent,
    MenuComponent,
    SignoutRedirectCallbackComponent,
    TicketsComponent,
    TicketCreatingComponent,
    EditingTicketComponent,
    ProfileComponent,
    ProfileEditingComponent,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
