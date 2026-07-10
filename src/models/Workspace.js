const mongoose = require("mongoose");

const WorkspaceSchema = new mongoose.Schema({
    owner : {
            type: mongoose.Schema.Types.ObjectId,
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