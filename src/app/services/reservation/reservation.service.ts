import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment.development";
import {HttpClient} from "@angular/common/http";
import {firstValueFrom, map, Observable} from "rxjs";
import {ResaForm, Reservation, ReservationHttp} from "../../models/reservation.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private baseUrlApi: string =  environment.API_URL
  private resourceName: string = 'reservations'

  private fullBaseUrlApi: string

  constructor(private http: HttpClient) {
    this.fullBaseUrlApi = this.baseUrlApi + this.resourceName
  }

  getAll(): Promise<Reservation[]> {
    const obsHttps$ = this.http
      .get<ReservationHttp[]>(`${this.fullBaseUrlApi}/`)
      .pipe(
        map((reservationsHttp: ReservationHttp[]) => reservationsHttp.map((reservationHttp: ReservationHttp) => Reservation.mapperReservationHttpToReservation(reservationHttp)))
      )
    return firstValueFrom(obsHttps$)
  }

  deleteById(id: number): Promise<any> {
    const obsHttps$ = this.http
      .delete(`${this.fullBaseUrlApi}/${id}`)

    return firstValueFrom(obsHttps$)
  }

  updateAcceptance(reservationId: number): Observable<any> {
    const url = `${this.fullBaseUrlApi}/${reservationId}`;
    const updateData = {
      accepted: true
    };

    return this.http.patch(url, updateData);
  }

  updateEmplacement(reservationId: number, resaForm: ResaForm): Promise<Object> {
    // const url = `${this.fullBaseUrlApi}/${reservationId}`;
    const obsHttps$ = this.http
      .patch<ReservationHttp[]>(`${this.fullBaseUrlApi}/${reservationId}`, resaForm)
      // .pipe(
      //   map((reservationsHttp: ReservationHttp[]) => reservationsHttp.map((reservationHttp: ReservationHttp) => Reservation.mapperReservationHttpToReservation(reservationHttp)))
      // )
    console.log(`${this.fullBaseUrlApi}/${reservationId}`)
    return firstValueFrom(obsHttps$)
  }

}
