import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Task document
interface ITask extends Document {
  title: string;
  description: string;
  status: string;
  deadline: String;
}

// Define the Task schema
const taskSchema: Schema = new Schema({

  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    required: true 
  },
  deadline: { 
    type: String, 
    required: true 
  },
  
});

// Create and export the Task model
const Task = mongoose.model<ITask>("Task", taskSchema);
export default Task;
export { ITask };