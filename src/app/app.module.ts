import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './components/header/header.component';
import { ListComponent } from './pages/users/list/list.component';
import { DetailsComponent } from './pages/users/details/details.component';
import { SigninComponent } from './pages/auth/signin/signin.component';
import { ErrorComponent } from './pages/error/error.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormErrorsComponent} from "./components/form-errors/form-errors.component";
import {AuthInterceptor} from "./interceptors/auth/auth.interceptor";
import { ListReservationComponent } from './pages/reservations/list-reservation/list-reservation.component';
import { ListCommandsComponent } from './pages/commands/list-commands/list-commands.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListComponent,
    DetailsComponent,
    SigninComponent,
    ErrorComponent,
    FormErrorsComponent,
    ListReservationComponent,
    ListCommandsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
