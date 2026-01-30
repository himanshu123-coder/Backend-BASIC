const jwt = require("jsonwebtoken");
const { JWT_USERSECRET} = require("../config");

function UserMiddleware(req , res, next){
    const token = req.header.token;
    const decoded = jwt.verify(token, JWT_USERSECRET);
     if(decoded){
        req.userId = decoded.id;
        next();
     }
     else {
        res.status(402).json({
            message : " NOT SIGNEDIN"
        })
     }
}

module.exports = {
    UserMiddleware : UserMiddleware
}