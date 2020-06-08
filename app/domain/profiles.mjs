import Mongoose from 'mongoose';
const { model, Schema } = Mongoose;


const profileSchema = new Schema({
    name: {
        type: String
    },
    age: {
        type: String
    },
    level: {
        type: Number
    }
}, {
    timestamps: true
  })

export default model('profileData', profileSchema);