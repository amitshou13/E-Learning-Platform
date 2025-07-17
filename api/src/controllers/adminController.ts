import { Request, Response } from 'express';
import db from '../config/db';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM Users');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

// Get all courses
export const getAllCourses = async (req: Request, res: Response) => {
    try {
        const result = await db.query('SELECT * FROM Courses');
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};