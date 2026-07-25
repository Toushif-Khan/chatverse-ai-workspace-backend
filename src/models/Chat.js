const mongoose = require("mongoose");


const ChatSchema = new mongoose.Schema({
    workspace : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Workspace",
        required : true
    },

    title:{
        type : String,
        required : true,
        trim : true
    }
            },

            {
                timestamps : true
            }
)

module.exports = mongoose.model("Chat" , ChatSchema );