const express = require('express');


const app = express();
app.use(express.json());//middleware 
function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}
const user = [];

app.post("/signup" ,function(req, res){
    const username = req.body.username;
   const password = req.body.password;
   user.push({
    username: username,
    password: password
   })
    res.send({
        message: "You have signed up"
    })
   console.log(user);
    
});

app.post("/signin", function(req,res){
    const username = req.body.username;
    const password = req.body.password;
const users = user.find(user=> user.username===username&& user.password===password);
if(user){
    const token = generateToken();
    user.token = token;
    res.send({
        token
    });
    console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
     console.log(user);
});
app.get("/me", (req, res) => {
    const token = req.headers.authorization;
    const users = user.find(user => user.token === token);
    if (user) {
        res.send({
            username: users.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})
app.listen(3010);