const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = async (req, res, next) =>{
    try{
        const jwtToken = req.header("token");
        
        if (!jwtToken){
            return res.status(401).json("Not authorized")
        }

        const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        req.user = payload.user;

        next();


    }
    catch(err){
        console.error(err.message);
    res.status(500).send("Not authorized");
    }
}