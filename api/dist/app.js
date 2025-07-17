"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv")); // for environment variables
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
dotenv_1.default.config(); // This loads environment variables from .env file
const app = (0, express_1.default)(); // create an express app
app.use((0, cors_1.default)()); // enables cors for all origins
app.use(express_1.default.json()); // Middleware to parse json bodies
// API Routes
app.use('/api/admin', adminRoutes_1.default);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong' });
});
const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = app;
