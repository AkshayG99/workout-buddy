//require .env
require("dotenv").config()

// require the express package | installs node_modules also
const express = require("express")
const mongoose = require("mongoose") 
const workoutRoutes = require("./routes/workouts")

// creates express app 
const app = express()



//middlewear
app.use(express.json())
//if next is not used then it does not go to next piece of middleware
app.use((req, res, next) => {
  // log out requests path and method
  console.log(req.path, req.method)
  next()
})

//routes
//react to requests 
//set up request handler, will react to get request
//attaches all routes to  app
//only when request fired to this route
app.use("/api/workouts", workoutRoutes)

//connect to DB
mongoose.connect(process.env.MONGO_URI)
  //after complete do this
  .then(() => {
    // listen for requests
    //process.env.PORT stores port number
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT)
    })
  })
  // catch errors and log to console
  .catch((error) => {
    console.log(error)
  })