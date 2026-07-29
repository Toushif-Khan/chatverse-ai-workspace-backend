const Message = require ("../models/Message");
const Workspace = require("../models/Workspace");
const Chat = require("../models/Chat")

const createMsg = async(req,res)=>{
   try{
     const {content , role} = req.body;
    
    const{workspaceId , chatId} = req.params;
    
    if(!content || !role){
        return res.status(400).json({
            message : "required"
        })
    }

    const matchWorkspace = await Workspace.findById(workspaceId); //(doesn't it conflict with owner)
    if(!matchWorkspace){
        return res.status(404).json({
            message:"Not found"
        })
    }

    if(matchWorkspace.owner.toString() !== req.currentUser.id){
        return res.status(403).json({
            message : "Forbidden"
        })
    }

    const matchChat = await Chat.findOne({
             _id : chatId,
        workspace: workspaceId,
    });
    
    if(!matchChat){
        return res.status(400).json({
            message:"Chat not found"
        })
    }

    const newMsg = await Message.create({
        chat    : chatId,
        content : content,
    })

    const createdMsg ={
        _id : newMsg._id,
     content: newMsg.content,
       role : newMsg.role
    }

    return res.status(201).json({
        message : "Message created Sucessfully",
        createdMsg
    })

        }catch(error){
            console.log(error);
            return res.status(500).json({
                message: "Internal error"
            })
        }
}


const getMsg = async(req,res)=>{

   try { 
    const {workspaceId , chatId} = req.params;

    const matchWorkspace = await Workspace.findById(workspaceId);
        if(!matchWorkspace){
            return res.status(404).json({
                message:"not found"
            })
        }
        

        if(matchWorkspace.owner.toString() !== req.currentUser.id ){
                return res.status(403).json({
                        message : "Forbidden"
                })

        }

        const Msgs = await Message.find({
            chat : chatId
        })

        if(!Msgs){
            return res.status(404).json({
                message: "Not found"
            })
        }

            return res.status(201).json({
                message : "Fetched Sucessfully",
                Msgs
            })
        } catch(error){
            console.log(error);
        return res.status(500).json({
            message: "Internal Error"
        })
        }
}

const getOneMsg = async(req,res)=>{

    const {chatId , workspaceId} = req.params;

    const matchWorkspace

}




module.exports = {createMsg , getMsg}