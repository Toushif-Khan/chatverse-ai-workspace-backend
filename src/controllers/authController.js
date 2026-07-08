const User = require("../models/User");
const bcrypt = require("bcryptjs");

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

     res.status(201).json(newUser);

    } catch(error){
            console.log(error);
            return res.status(500).json({
                message: "Internal error"
            })
    }

}


module.exports = registerUser;