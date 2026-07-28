const mongoose =  require("mongoose");


const messageSchema = new mongoose.Schema({

            chat : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Chat",
                required :  true,
            },

            role : {
                type: String,
                enum : ["user" , "assistant"],         // User / AI
                required : true,
                trim : true,
            },

            content : {
                type: String ,
                required : true,
                trim : true,
            }
        },
            {
                    timestamps : true
            })


 module.exports = mongoose.model("Message" , messageSchema);