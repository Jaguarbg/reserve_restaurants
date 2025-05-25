import { PlacesModel } from '../models/PlacesModel';

export class PlacesController {
    private placesModel = new PlacesModel();

    async getAllPlaces() {
        return await this.placesModel.getAll();
    }
}
