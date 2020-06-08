import Mongoose from 'mongoose';
const { model, Schema } = Mongoose;


const taskmanagementSchema = new Schema({
    taskName: {
        type: String
    },
    description: {
        type: String
    },
    StartTime: {
        type: Date
    },
    EndTime: {
        type: Date
    },
    Status: {
        type: String,
        default: "scheduled"
    },
}, {
    strict: true,
    timestamps: true
  })

export default model('taskSchema', taskmanagementSchema);