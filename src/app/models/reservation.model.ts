export  interface ReservationHttp {
  "id": number
  "lane": number
  "column": number
  "date_to": Date
  "equipment": string
  "accepted": boolean
}

export interface Reservation {
  id: number
  lane: number
  column: number
  date_to: Date
  equipment: string
  accepted: boolean
}

export interface ResaForm {
  column: number
}

export namespace  Reservation {
  export function mapperReservationHttpToReservation(reservationHttp: ReservationHttp): Reservation {
    console.log(reservationHttp)
    return {
      id: reservationHttp.id,
      lane: reservationHttp.lane,
      column: reservationHttp.column,
      date_to: reservationHttp.date_to,
      equipment: reservationHttp.equipment,
      accepted: reservationHttp.accepted
    }
  }
}
