const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    date :{
        type : Date,
        required : true,
    },
    priorityLevel : {
        type : Number,
        required : true,
    },
    completed : {
        type : Boolean,
        default : false
    }
})

const taskModel = new mongoose.model("Task",taskSchema);

module.exports = taskModel;