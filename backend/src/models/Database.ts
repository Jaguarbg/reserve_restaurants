import mysql, { Pool } from "mysql2/promise";

export class Database {
    public static pool: Pool = mysql.createPool({
        host: "localhost",
        database: "reserve_restaurants",
        user: "root",
        password: "", // ако имаш парола – добави я тук
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    static getConnection() {
        return this.pool;
    }
}
