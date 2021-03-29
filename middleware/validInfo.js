module.exports = function(req, res, next) {
    
  
    function validEmail(userEmail) {
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
    }
  
    if (req.path === "/register") {
        const { first_name, last_name, email,  password } = req.body;
      console.log(!email.length + "hello");
      console.log(first_name);
      console.log(last_name);
      console.log(email);
      console.log(password);
      if (![first_name, last_name, email, password].every(Boolean)) {
        console.log("here we have a problem");
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    } else if (req.path === "/login") {
        const { email, password } = req.body;
      if (![email, password].every(Boolean)) {
        return res.status(401).json("Missing Credentials");
      } else if (!validEmail(email)) {
        return res.status(401).json("Invalid Email");
      }
    }
  
    next();
  };