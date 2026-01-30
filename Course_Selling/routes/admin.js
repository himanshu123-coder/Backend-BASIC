const {Router}  = require("express");
const { adminModel, courseModel } = require("../db");
const { JWT_ADMINSECRET} = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { adminMiddleware } = require("../middleware/admin");
 const adminRouter = Router();




// Define the admin routes for signup 
adminRouter.post("/signup", async function (req, res) {
    const { email, password, firstName, lastName} = req.body;
    const hashedPassword = await bcrypt.hash(password,5);
     await adminModel.create({
        email : email,
        password : hashedPassword,
        firstName : firstName,
        lastName : lastName
    })

    res.json({
        message: "Signup endpoint",
    });
});

// Define the admin routes for signin 
adminRouter.post("/signin",async function (req, res) {
    const email = req.body.email;
        const password = req.body.password;
    
        const response = await adminModel.findOne({
            email: email
        });
          const passwordMatch = bcrypt.compare(password,response.password);
          if (passwordMatch) {
                  const token = jwt.sign({
                      id: response._id.toString()
                  }, JWT_ADMINSECRET);
          
                  res.json({
                      token
                  })
              } else {
                  res.status(403).json({
                      message: "Incorrect creds"
                  })
              }
   
});

// Define the admin routes for creating a course 
adminRouter.post("/course", adminMiddleware,  async function (req, res) {
    const adminId = req.userId; 
    const { title , description , imageUrl, price} = req.body;
     const course = await courseModel.create ({
        title : title,
         description : description,
           imageUrl : imageUrl,
            price : price,
            createrId : adminId
    })
    res.json({
        message: "Course endpoint",
        courseId : course._id
    });
});

// Define the admin routes for updating a course
adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const course = await courseModel.updateOne({
        _id : courseId,
        creatorId : adminId
    },{
        title : title,
        description : description,
        imageUrl : imageUrl,
        price : price
    })    


    res.json({
        message: "course  updated endpoint",
        courseId : course._id
    });
});

// Define the admin routes for getting all courses
adminRouter.get("/bulk",adminMiddleware, async function (req, res) {
    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId : adminId
    })
    res.json({
        message: "bulk endpoint",
        courses
    });
});

// Export the adminRouter so that it can be used in other files
module.exports = {
    adminRouter: adminRouter
}