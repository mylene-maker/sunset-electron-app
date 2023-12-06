// {
//   "id": 1,
//   "lane": 1,
//   "column": null,
//   "date_to": "2024-05-31T22:00:00.000+00:00",
//   "equipment": "UN_LIT",
//   "command": {
//   "id": 1,
//     "payment": true,
//     "remarque": "Test reservation"
// },
//   "accepted": true
// }

export  interface ReservationHttp {
  "id": number
  "lane": number
  "column": number
  "date_to": Date
  "equipment": string
  "accepted": boolean
  "commandId": number
}

export interface Reservation {
  id: number
  lane: number
  column: number
  date_to: Date
  equipment: string
  accepted: boolean
  commandId: number
}

export namespace  Reservatuion {
  export function mapperReservationHttpToReservation(reservationHttp: ReservationHttp): Reservation {
    return {
      id: reservationHttp.id,
      lane: reservationHttp.lane,
      column: reservationHttp.column,
      date_to: reservationHttp.date_to,
      equipment: reservationHttp.equipment,
      accepted: reservationHttp.accepted,
      commandId: reservationHttp.commandId
    }
  }
}
