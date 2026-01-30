const jwt = require("jsonwebtoken");
const { JWT_ADMINSECRET} = require("../config");

function adminMiddleware(req , res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, JWT_ADMINSECRET);
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
    adminMiddleware : adminMiddleware
}
