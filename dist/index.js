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
const express_1 = __importDefault(require("express"));
const dataBase_1 = __importDefault(require("./config/dataBase"));
const taskRoutes_1 = __importDefault(require("./Routes/taskRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const Task_1 = __importDefault(require("./Models/Task"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
// Middleware to handle CORS
app.use((0, cors_1.default)(corsOptions));
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Use the task routes
app.use("/api/v1", taskRoutes_1.default);
// Basic route to test the server
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express');
});
// Function to check and update expired tasks
const updateExpiredTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    const today = new Date().toLocaleDateString("en-CA");
    try {
        // Find tasks where the deadline has passed and status is either 'To Do' or 'In Progress'
        const expiredTasks = yield Task_1.default.updateMany({ deadline: { $lt: today }, status: { $in: ["To Do", "In Progress"] } }, { $set: { status: "Expired" } });
    }
    catch (error) {
        console.error("Error updating expired tasks:", error);
    }
});
// Schedule the cron job to run every day at every minute
const cronSchedule = process.env.CRON_SCHEDULE || "0 0 * * *"; // Default to midnight
node_cron_1.default.schedule(cronSchedule, updateExpiredTasks);
// Connect to the database
(0, dataBase_1.default)();
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
