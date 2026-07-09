const jwt = require("jsonwebtoken");


const authMiddleware = (req,res,next)=>{

   try{  const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({
            message : "Authorization token is required"
        })
    }

        const token = authorization.split(" ") [1];

      const decodedToken =  jwt.verify(token , process.env.JWT_SECRET);

      req.currentUser = decodedToken; // assigning new prperty not key like student .age = 23 
                            //then student ={age:23} just like req ={  
                      //                                           body{...},param{...},query{...} (now it also has)    currentUser {id,iat,eat}   };

        next();  } catch (error) {
                    console.error(error)
                    return res.status(401).json({
                        message : "Invalid or expired token"
                    });
        }

}