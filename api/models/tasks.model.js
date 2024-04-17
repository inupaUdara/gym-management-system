import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({

  userId:{
    type : String,
    required : true
  },

  title: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  image: {
    type: String ,
    default: 'https://i.pinimg.com/originals/2b/f0/e0/2bf0e06f26135c159a64591c817f639e.jpg',
  },

  buttonState: {
    type: String,
    enum: ['Progress', 'Complete'],
    default: 'Progress',
  }

});

const Tasks = mongoose.model('Tasks', taskSchema);

export default Tasks;
