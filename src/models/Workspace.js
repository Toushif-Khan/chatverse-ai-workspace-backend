const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
    owner : {
            type: mongoose.Schema.Types.ObjectId,  //stores objectId of User can use poplate to replace with User document
            ref:"User",
            required: true
          },
              
    name : {
        type: String,
        required: true,
        trim : true
    },

    icon : {
        type: String,
        default: "folder",
    }

    },   {
            timestamps: true,
        }

)

module.exports = mongoose.model("Workspace",WorkspaceSchema);