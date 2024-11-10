import { Request, Response } from "express";
import Task from "../Models/Task";

// Fetch all tasks
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await Task.find();
        res.status(200).json({
            success:true,
            response:tasks
        });
    } catch (error:any) {
        res.status(500).json({ 
            success:false,
            message: "Failed to fetch tasks",
            error: error.message 
        });
    }
};

// Fetch a single task by ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            res.status(404).json({ 
                success:true,
                message: "Task not found" 
            });
            return;
        }
        res.status(200).json({
            success:true,
            task
        });
    } catch (error:any) {
        res.status(500).json({ 
            success:false,
            message: "Failed to fetch task",
            error: error.message 
        });
    }
};

const convertToISODate = (dateString: string) => {
    const [month, day, year] = dateString.split("/").map(Number);
  // Use Date.UTC to avoid timezone shifts
  const utcDate = new Date(Date.UTC(year, month - 1, day));
  return utcDate.toISOString().split("T")[0];
};

// Create a new task with title, description, and deadline
export const createTask = async (req: Request, res: Response): Promise<void> => {

    try {
        const { title, description, deadline } = req.body;
        const formattedDeadline = convertToISODate(deadline);

        const newTask = new Task({
            title,
            description,
            deadline: formattedDeadline,
            status: "To Do" 
        });
        await newTask.save();
        res.status(200).json({
            success:true,
            response:newTask
        });
    } catch (error:any) {
        res.status(500).json({ 
            success:false,
            message: error
        });
    }
};

// Update specific fields of a task by ID
export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, status, deadline } = req.body;
        
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { ...(title && { title }), ...(description && { description }), ...(status && { status }), ...(deadline && { deadline }) },
            { new: true }
        );

        if (!updatedTask) {
            res.status(404).json({ 
                success:false,
                message: "Task not found" 
            });
            return;
        }

        res.status(200).json({
            success:true,
            updatedTask
        });
    } catch (error:any) {
        res.status(500).json({ 
            success:false,
            message: "Failed to update task", 
            error: error.message 
        });
    }
};

// Delete a task by ID
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            res.status(404).json({ 
                success:false,
                message: "Task not found" 
            });
            return;
        }
        res.status(200).json({ 
            success:true,
            message: "Task deleted successfully" 
        });
    } catch (error:any) {
        res.status(500).json({ 
            success:false,
            message: "Failed to delete task", 
            error: error.message 
        });
    }
};



