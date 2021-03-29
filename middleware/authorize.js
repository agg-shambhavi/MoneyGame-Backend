const jwt = require("jsonwebtoken");
require("dotenv").config();

//this middleware will on continue on if the token is inside the local storage

module.exports = async (req, res, next) =>{
    try{
        const jwtToken = req.header("token");
        
        if (!jwtToken){
            return res.status(403).send({auth : false, message : 'No token provided'});
        }
        else{
            jwt.verify(jwtToken, process.env.JWT_SECRET,
                (err , decoder) => {
                    if (err)
                        return res.status(500).send({auth : false, message: "Token authorization failed"});
                    else{
                        req.user = decoder.user;
                        next();
                    }
                } 
            )
        
        }

        // const payload = jwt.verify(jwtToken, process.env.jwtSecret);

        // req.user = payload.user;

        


    }
    catch(err){
        console.error(err.message);
    res.status(500).send("Not authorized");
    }
}