import { Database } from './Database';
import { CreateReservation } from '../common/ReservationInterfaces';

export class ReservationModel {
    async getAll() {
        const pool = Database.getConnection();
        const [rows] = await pool.query('SELECT * FROM reservations');
        return rows;
    }

    async create(data: CreateReservation) {
        const pool = Database.getConnection();
        const [result]: any = await pool.query(
            `INSERT INTO reservations (name, phone, date, time, guests, user_id, place_id)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [data.name, data.phone, data.date, data.time, data.guests, data.user_id ?? null, data.place_id]
        );

        return { id: result.insertId, ...data };
    }

    async update(id: number, data: CreateReservation) {
        const pool = Database.getConnection();
        await pool.query(
            `UPDATE reservations SET name = ?, phone = ?, date = ?, time = ?, guests = ?, user_id = ?, place_id = ? WHERE id = ?`,
            [data.name, data.phone, data.date, data.time, data.guests, data.user_id ?? null, data.place_id, id]
        );
        return { id, ...data };
    }

    async delete(id: number) {
        const pool = Database.getConnection();
        await pool.query('DELETE FROM reservations WHERE id = ?', [id]);
    }

    async getByUserId(userId: number) {
        const pool = Database.getConnection();
        const [rows] = await pool.query('SELECT * FROM reservations WHERE user_id = ?', [userId]);
        return rows;
    }

}
