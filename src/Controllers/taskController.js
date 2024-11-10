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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskById = exports.getAllTasks = void 0;
const Task_1 = __importDefault(require("../Models/Task"));
// Fetch all tasks
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Task_1.default.find();
        res.status(200).json({
            success: true,
            response: tasks
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks",
            error: error.message
        });
    }
});
exports.getAllTasks = getAllTasks;
// Fetch a single task by ID
const getTaskById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield Task_1.default.findById(req.params.id);
        if (!task) {
            res.status(404).json({
                success: true,
                message: "Task not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            task
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch task",
            error: error.message
        });
    }
});
exports.getTaskById = getTaskById;
const convertToISODate = (dateString) => {
    const [month, day, year] = dateString.split("/").map(Number);
    // Use Date.UTC to avoid timezone shifts
    const utcDate = new Date(Date.UTC(year, month - 1, day));
    return utcDate.toISOString().split("T")[0];
};
// Create a new task with title, description, and deadline
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, deadline } = req.body;
        const formattedDeadline = convertToISODate(deadline);
        const newTask = new Task_1.default({
            title,
            description,
            deadline: formattedDeadline,
            status: "To Do"
        });
        yield newTask.save();
        res.status(200).json({
            success: true,
            response: newTask
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error
        });
    }
});
exports.createTask = createTask;
// Update specific fields of a task by ID
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, deadline } = req.body;
        const updatedTask = yield Task_1.default.findByIdAndUpdate(req.params.id, Object.assign(Object.assign(Object.assign(Object.assign({}, (title && { title })), (description && { description })), (status && { status })), (deadline && { deadline })), { new: true });
        if (!updatedTask) {
            res.status(404).json({
                success: false,
                message: "Task not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            updatedTask
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update task",
            error: error.message
        });
    }
});
exports.updateTask = updateTask;
// Delete a task by ID
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedTask = yield Task_1.default.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            res.status(404).json({
                success: false,
                message: "Task not found"
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete task",
            error: error.message
        });
    }
});
exports.deleteTask = deleteTask;
