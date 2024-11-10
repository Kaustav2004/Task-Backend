import express, { Request, Response } from 'express';
import dbConnect from './config/dataBase';
import taskRoutes from "./Routes/taskRoutes"; 
import dotenv from 'dotenv';
import cors from 'cors';
import cron from "node-cron";
import Task from './Models/Task';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};

// Middleware to handle CORS
app.use(cors(corsOptions));

// Middleware to parse JSON bodies
app.use(express.json());

// Use the task routes
app.use("/api/v1", taskRoutes);

// Basic route to test the server
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express');
});

// Function to check and update expired tasks
const updateExpiredTasks = async () => {
  const today = new Date().toLocaleDateString("en-CA");

    try {
      // Find tasks where the deadline has passed and status is either 'To Do' or 'In Progress'
      const expiredTasks = await Task.updateMany(
        { deadline: { $lt: today }, status: { $in: ["To Do", "In Progress"] } },
        { $set: { status: "Expired" } }
      );
  
    } catch (error) {
      console.error("Error updating expired tasks:", error);
    }
};

// Schedule the cron job to run every day at every minute
cron.schedule("* * * * *", updateExpiredTasks);


// Connect to the database
dbConnect();

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
