const express = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "randomhimanshu"
const app = express();
app.use(express.json());

const users = [];

app.get("/" , function(req,res){
   res.sendFile(__dirname +"/public/index.html");
})

 app.post("/signup", function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    users.push({
        username : username,
        password : password
    })
    res.json({
        message: "signup complete"
    })
    console.log(users);
    
 })
 app.post("/signin", function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    let founduser = null;
    for(let i =0;i<users.length;i++){
        if(users[i].username===username && users[i].password ===password){
            founduser = users[i]
        }}
        if(founduser){
            const token = jwt.sign({
                username: username,
                password: password,
                
            }, JWT_SECRET);

            res.json({
                token : token
            })
        }
        else {
            res.status(403).send({
                message : "INVALID USERNAME"
            })
        }
        console.log(users);
 })
//   app.get("/me", (req, res) => {
//     const token = req.headers.token;
    

//    const decodedData = jwt.verify(token, JWT_SECRET);

// if (decodedData.username) {
//     let foundUser = null;

//     for (let i = 0; i < users.length; i++) {
//         if (users[i].username === decodedData.username) {
//             foundUser = users[i];
//         }
//     }

//     res.json({
//         username: foundUser.username,
//         password: foundUser.password
//     })
// }
//   })
function auth(req, res, next) {
    const token = req.headers.token;//important

    if (token) {
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).send({
                    message: "Unauthorized"
                })
            } else {
                req.user = decoded;
                next();
            }
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
}

app.get("/me", auth, (req, res) => {
    const user = req.user;

    res.send({
        username: user.username
    })
})

app.listen(3000)