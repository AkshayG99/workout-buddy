const Workout = require("../models/workoutModel")
const mongoose = require("mongoose")

// get all workouts 
const getWorkouts  = async (req, res) => {
  //find all documents and sort by date created
  const workouts = await Workout.find({}).sort({createdAt: -1})

  // send 200 status and all workouts in json
  res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
  // get the id from the request parameters
  const { id } = req.params

  //check if id is not valid 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //return 404 error and no such workout error
    return res.status(404).json({error: "No such workout"})
  }

  // find the workout by the id 
  const workout = await Workout.findById(id)

  // if the workout doesnt exist
  if (!workout) {
    // return 404 error status and send error message
    // used return so it exits the code and doesnt run the rest
    return res.status(404).json({error: "no such workout"})
  }
  // if workout does exist send 200 statys and workout in JSON
  res.status(200).json(workout)

}

// create a new workout
const createWorkout = async (req, res) => {
  //create workout document 
  const {title, load, reps} = req.body

  // error handling
  let emptyFields = []

  if (!title) {
    emptyFields.push("title")
  }
  if (!load) {
    emptyFields.push("load")
  }
  if (!reps) {
    emptyFields.push("reps")
  }
  // if greater than 0 then send error because field is missing else just continue
  if (emptyFields.length > 0) {
    return res.status(400).json({error: "Please fill in all fields"}, emptyFields)
  }

  //add document to db
  try {
    //create workout
    const workout = await Workout.create({title, load, reps})
    //send back 200 to show everything is okay and workout model
    res.status(200).json(workout)
  } catch (error) {
    //send back 400 error code and the error message
    res.status(400).json({error: error.messge})
  }
}

// delete a workout
const deleteWorkout = async (req, res) => {
  // get the id
  const { id } = req.params

  //check if id is not valid 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    //return 404 error and no such workout error
    return res.status(404).json({error: "No such workout"})
  }

  // find document with the id and delete it
  const workout = await Workout.findOneAndDelete({_id: id})

  // if the workout doesnt exist
  if (!workout) {
    //if no workout send back 400 error 
    return res.status(400).json({error: "no such workout"})
  }

  // if have the workout send 200 status and the deleted workout
  res.status(200).json(workout)
}


//update a workout
const updateWorkout =  async (req, res) => {
    // get the id
    const { id } = req.params

    //check if id is not valid 
    if (!mongoose.Types.ObjectId.isValid(id)) {
      //return 404 error and no such workout error
      return res.status(404).json({error: "No such workout"})
    }

    //find workout by id and update
    const workout = await Workout.findOneAndUpdate({_id: id}, {
      // spread properities of object into this new object to update
      ...req.body
    })

    if (!workout) {
      //if no workout send back 400 error 
      return res.status(400).json({error: "no such workout"})
    }

    // send 200 status and the updated workout 
    res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}