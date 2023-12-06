import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListComponent} from "./pages/users/list/list.component";
import {DetailsComponent} from "./pages/users/details/details.component";
import {SigninComponent} from "./pages/auth/signin/signin.component";
import {ErrorComponent} from "./pages/error/error.component";
import {authGuard} from "./guards/auth/auth.guard";
import {ListReservationComponent} from "./pages/reservations/list-reservation/list-reservation.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'users'},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'users', canActivate: [authGuard],  children: [
      { path: '', component: ListComponent},
      { path: ':id', component: DetailsComponent},
    ]
  },
  { path: 'reservations', canActivate: [authGuard],  children: [
      { path: '', component: ListReservationComponent}
    ]
  },
  { path: 'not-found', component: ErrorComponent},
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

