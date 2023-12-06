import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, debounceTime, map, Observable} from "rxjs";
import {Reservation} from "../../../models/reservation.model";
import {ReservationService} from "../../../services/reservation/reservation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {faCheck, faEdit, faPlus, faRemove, faUser} from "@fortawesome/free-solid-svg-icons";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit{

  iconReject: IconDefinition = faRemove;
  iconAccept: IconDefinition = faCheck;

  reservations$?: Observable<Reservation[]>
  selectedReservationDeleteConfirmation?: Reservation
  showDeleteSuccessToast: boolean = false


  private searchFilterText$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined)

  constructor(private reservationService: ReservationService, private modalService: NgbModal) {
  }
  ngOnInit (): void {
    this.reservations$ = this.getReservationsFiltered()
  }
  onInputSearchFilter(evt: any) {
    const searchDate = evt.target?.value
    this.searchFilterText$.next(searchDate)
  }
  private getReservationsFiltered(): Observable<Reservation[]> {
    return combineLatest([
      this.reservationService.getAll(),
      this.searchFilterText$
    ])
      .pipe(
        debounceTime(500),
        map(([reservations, searchText]) => {
          if(searchText) {
            return reservations.filter(r => r.date_to)
          }
          return reservations
        })
      )
  }

  onClickEditReservation(modalReservationForm: any, reservation: Reservation) {

  }

  onClickDeleteResservation(modalDeleteReservation: any, reservation: Reservation) {
    this.selectedReservationDeleteConfirmation = reservation
    const modal = this.modalService.open(modalDeleteReservation)
    modal.result
      .then((choice) => {
        this.reservationService
          .deleteById(reservation.id)
          .then(() => {
            this.reservations$ = this.getReservationsFiltered()
          })
        this.showDeleteSuccessToast = true
      })
      .catch(() => {})
  }




}
