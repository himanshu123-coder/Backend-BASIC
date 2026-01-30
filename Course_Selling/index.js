const express = require("express");
const mongoose = require("mongoose");


const app = express();
app.use(express.json());
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");




// use the routes in the app object
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
async function main() {
    // Error handling using try-catch if any error occurs while connecting to database
    try {
        // Use the connect method to connect to the database and log a success message if the connection is successful
        const connection = await mongoose.connect("mongodb+srv://himanshuchaurasiya756_db_user:X8tGrvQzy7HSiJTH@cluster0.8rai6bw.mongodb.net/course_sell");
        console.log("Connected to the database");
    } catch(error) {
         console.log("Failed to connect to the database", error)
    }}




app.listen(3000);
main();