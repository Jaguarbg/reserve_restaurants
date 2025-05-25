export interface CreateReservation {
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number;
    place_id: number;
    user_id?: number | null;
}


export interface UpdateReservationDTO extends CreateReservation {
    id: number;
}
