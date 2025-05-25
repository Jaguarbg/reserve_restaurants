import { ReservationModel } from '../models/ReservationModel';
import { CreateReservation } from '../common/ReservationInterfaces';

export class ReservationController {
    private model: ReservationModel;

    constructor() {
        this.model = new ReservationModel();
    }

    async getAllReservations() {
        return await this.model.getAll();
    }

    async createReservation(data: CreateReservation) {
        return await this.model.create(data);
    }

    async updateReservation(id: number, data: CreateReservation) {
        return await this.model.update(id, data);
    }

    async deleteReservation(id: number) {
        return await this.model.delete(id);
    }

    async getReservationsByUserId(userId: number) {
        return await this.model.getByUserId(userId);
    }

}
