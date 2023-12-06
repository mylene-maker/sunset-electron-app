import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, debounceTime, map, Observable} from "rxjs";
import {Command} from "../../../models/command.model";
import {CommandService} from "../../../services/command/command.service";
import {ResaForm, Reservation} from "../../../models/reservation.model";
import {IconDefinition} from "@fortawesome/free-regular-svg-icons";
import {faCheck, faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {ReservationService} from "../../../services/reservation/reservation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User, UserForm} from "../../../models/user.model";

@Component({
  selector: 'app-list-commands',
  templateUrl: './list-commands.component.html',
  styleUrls: ['./list-commands.component.css']
})
export class ListCommandsComponent implements OnInit{

  commands$?: Promise<Command[]>

  iconAccept : IconDefinition = faCheck;

  // edit column
  resaForm?: FormGroup;


  constructor(private commandService: CommandService, private modalService: NgbModal, private fb: FormBuilder, private reservationService: ReservationService) {
  }
  ngOnInit(): void {
    this.commands$ = this.commandService.getAll()
  }

  onClickAccepted(reservation: any) {
    this.reservationService.updateAcceptance(reservation.id)
      .subscribe(
        () => {
          reservation.accepted = true;
        },
        error => {
          console.error("Erreur lors de la mise à jour de la réservation", error);
        }
      );
  }


  onClickOpenModalEmplacement(modalEmplacement: any, reservation: Reservation) {
    this.initResaForm(reservation)
    const modal = this.modalService.open(modalEmplacement)

    modal.result
      .then( ()=> {

        const resaForm: ResaForm = {
          column :Number (this.resaForm?.value.column)
        }
        console.log(resaForm)
        this.reservationService
          .updateEmplacement(reservation.id, resaForm)
          .then(() => {
            this.commands$ = this.commandService.getAll()
          })

      })
      .catch(() => {
        console.log("Hello")
      })

  }
  private initResaForm(resaToEdit?: Reservation): void{
    this.resaForm = this.fb.group({
      column: [resaToEdit ? resaToEdit.column : undefined],

    })

  }
  onSubmitEmplacement(modal: any) {
    if(this.resaForm?.valid){ modal.close() }
  }


}
