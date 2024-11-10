"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../Controllers/taskController");
const router = (0, express_1.Router)();
// Task routes
router.get("/tasks", taskController_1.getAllTasks);
router.get("/tasks/:id", taskController_1.getTaskById);
router.post("/tasks", taskController_1.createTask);
router.put("/tasks/:id", taskController_1.updateTask);
router.delete("/tasks/:id", taskController_1.deleteTask);
exports.default = router;
