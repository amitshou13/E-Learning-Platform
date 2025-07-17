"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Database {
    constructor() {
        this.pool = new pg_1.Pool({
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
    static getInstance() {
        if (!this._instance) {
            this._instance = new Database();
        }
        return this._instance;
    }
    getPool() {
        return this.pool;
    }
    query(sql, params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.pool.query(sql, params);
                return result;
            }
            catch (error) {
                console.error('Query failed:', error);
                throw error;
            }
        });
    }
}
const db = Database.getInstance();
exports.default = db;
