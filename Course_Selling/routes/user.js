const {Router}  = require("express");
const { userModel, courseModel } = require("../db");
const { JWT_USERSECRET} = require("../config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserMiddleware } = require("../middleware/user");
 const userRouter = Router();
+
 userRouter.post("/signup",  async function(req,res){

    const { email, password, firstName, lastName} = req.body;
    const hashedPassword = await bcrypt.hash(password,5);
     await userModel.create({
        email : email,
        password : hashedPassword,
        firstName : firstName,
        lastName : lastName
    })

    res.json({
        message: "signup endpoint"
    })
 })
 userRouter.post("/signin", async function(req,res){
    const email = req.body.email;
        const password = req.body.password;
    
        const response = await userModel.findOne({
            email: email
        });
          const passwordMatch = bcrypt.compare(password,response.password);
          if (passwordMatch) {
                  const token = jwt.sign({
                      id: response._id.toString()
                  }, JWT_USERSECRET);
          
                  res.json({
                      token
                  })
              } else {
                  res.status(403).json({
                      message: "Incorrect creds"
                  })
              }


 });
   
 userRouter.get("/purchasess", UserMiddleware, async function(req,res){
    const userId = req.userId;
    const purchasess = await purchaseModel({
        userId
    })
    const courseData = await courseModel.find({
        _ID: { $in : purchasess.map(x=> x.courseId)}
    })

    res.json({
       purchasess,
       courseData
    })
 })
  module.exports = {
    userRouter : userRouter
  }