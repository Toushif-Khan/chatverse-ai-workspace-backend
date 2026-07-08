const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


const registerUser = async (req,res) =>{
    try{

    const {name , email , password} = req.body; 

     if( !name || !email || !password){
    return res.status(400).json({
        message: "All fields are required"
    })
 }

 const existingUser = await User.findOne({
    email : email
        });

    if(existingUser){
        return res.status(409).json({
            message : "User already exist"
        })
    }

 const hashedPassword = await bcrypt.hash(password , 10);


   const newUser = await User.create({
        name : name,
        email : email,
        password : hashedPassword
     });

     const createdUser = {
        message: "User created Sucessfully",

        user:{
           name: newUser.name,
           email: newUser.email,
           _id : newUser._id
        }
     }

     res.status(201).json(createdUser);

    } catch(error){
            console.log(error);
            return res.status(500).json({
                message: "Internal error"
            })
    }

}




const loginUser = async(req, res)=>{

    const { email , password } = req.body;

    if(!email || !password){
        return res.status(400).json({
            message : "All fields are required"
        });
    }

    const existingUser = await User.findOne({email})

        if(!existingUser){
            return res.status(401).json({
                message : "Invalid email or password"
            });
        }

        const isMatch = await bcrypt.compare(password , existingUser.password)

        if(!isMatch){
            return res.status(401).json({
                message: "Invalid email or password"
            })
        }

          const token = jwt.sign(
                
                   { id : existingUser._id, },
                     process.env.JWT_SECRET,                
                {
                    expiresIn : "7d"
                }
            );

            return res.status(200).json({
                message:"Login Successful",
                token
            })
        


}


module.exports = { registerUser , loginUser };