import { Database } from './Database';

export class PlacesModel {
    async getAll() {
        const pool = Database.getConnection();
        const [rows] = await pool.query('SELECT * FROM places');
        return rows;
    }
}
