export interface Place {
    id: number;
    name: string;
    city: string;
    address: string;
    phone?: string;
    working_hours?: string;
    image_url?: string;
}

export interface CreatePlace {
    name: string;
    city: string;
    address: string;
    phone?: string;
    working_hours?: string;
    image_url?: string;
}
