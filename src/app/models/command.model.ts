import {Reservation, ReservationHttp} from "./reservation.model";

export interface  CommandHttp {
  "id": number
  "payment": boolean
  "remarque": string
  "customer": {
    "id": number,
    "lastname": string,
    "firstname": string,
    "email": string,
    "country": string,
    "street_number":number,
    "street_name": string,
    "zip_code": string,
    "password": string,
    "roles":
      {
        "id": number,
        "roleName": string
      }[]
  },
  reservations: ReservationHttp[]
}

export interface Command {
  "id": number
  "payment": boolean
  "remarque": string
  reservations: Reservation[]
}

export namespace  Command {
  export function mapperCommandHttpToCommand(commandHttp: CommandHttp): Command {
    console.log(commandHttp)

    return {
      id: commandHttp.id,
      payment: commandHttp.payment,
      remarque: commandHttp.remarque,
      reservations: commandHttp.reservations.map(reservation => Reservation.mapperReservationHttpToReservation(reservation))
    }
  }
}
