import { Database } from './Database';
import bcrypt from 'bcrypt';

export class User {
    constructor(
        public id: number | null,
        public username: string,
        public email: string,
        public password: string, // хеширана парола
        public isActive: boolean,
        public isAdmin: boolean
    ) {}

    static async findByIdentifier(identifier: string): Promise<User | null> {
        const pool = Database.getConnection();
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ? OR email = ?', [identifier, identifier]);
        const row = (rows as any[])[0];
        if (!row) return null;

        return new User(row.id, row.username, row.email, row.password, !!row.is_active, !!row.is_admin);
    }

    async save(): Promise<void> {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const pool = Database.getConnection();

        const [result]: any = await pool.query(
            `INSERT INTO users (username, email, password, is_active, is_admin) VALUES (?, ?, ?, ?, ?)`,
            [this.username, this.email, hashedPassword, this.isActive, this.isAdmin ? 1 : 0]
        );

        this.id = result.insertId;
        this.password = hashedPassword;
    }

    static async validatePassword(user: User, inputPassword: string): Promise<boolean> {
        return bcrypt.compare(inputPassword, user.password);
    }
}
