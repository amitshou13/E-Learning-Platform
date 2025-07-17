import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; // for environment variables
import adminRoutes from './routes/adminRoutes';

dotenv.config(); // This loads environment variables from .env file

const app = express();  // create an express app
app.use(cors());  // enables cors for all origins
app.use(express.json()); // Middleware to parse json bodies

// API Routes
app.use('/api/admin', adminRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;