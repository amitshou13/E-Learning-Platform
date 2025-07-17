import { Pool, QueryResult, QueryResultRow } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    private pool: Pool;
    private static _instance: Database;

    private constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: String(process.env.DB_PASSWORD),
            port: Number(process.env.DB_PORT || '5432'),
        });

        this.pool.connect()
            .then((client) => {
                console.log("Database connected successfully.");
                client.release();
            })
            .catch((err) => {
                console.error('Initial DB connection failed:', err);
            });
    }

    static getInstance(): Database {
        if (!this._instance) {
            this._instance = new Database();
        }

        return this._instance;
    }

    public getPool(): Pool {
        return this.pool;
    }

    async query<T extends QueryResultRow = any>(sql: string, params?: any[]): Promise<QueryResult<T>> {
        try {
            const result = await this.pool.query<T>(sql, params);
            return result;
        } catch (error) {
            console.error('Query failed:', error);
            throw error;
        }
    }
}

const db = Database.getInstance();
export default db;