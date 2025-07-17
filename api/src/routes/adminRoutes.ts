import express from 'express';
import { getAllUsers, getAllCourses } from '../controllers/adminController';

const router = express.Router();

router.get('/users', getAllUsers);
router.get('/courses', getAllCourses);

export default router;