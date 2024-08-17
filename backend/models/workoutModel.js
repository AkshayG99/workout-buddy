const mongoose = require("mongoose")

const Schema = mongoose.Schema

//enforces this model
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    //shows when it was created and updated
}, { timestamps: true})

//make model based on schema
//apply Schema to model to interact with
module.exports = mongoose.model("Workout", workoutSchema)

// this type of syntax assuming imported as Workout is   Workout.find()