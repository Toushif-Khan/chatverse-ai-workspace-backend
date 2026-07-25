const Chat = require ("../models/Chat");
const Workspace = require("../models/Workspace")

const createChat = async(req,res)=>{

  try { 
    const { title } = req.body;
    const {workspaceId} = req.params;  // on clicking sends which workspace id acc. to the workspace clicked

        if(!title){
            return res.status(400).json({
                message: "title required"
            })
        };

        const newChat = await Chat.create({
           workspace : workspaceId,
            title,
        });

        const createdChat ={
            message: "Chat created",
            chat : {
               title: newChat.title
                }
        }

        return res.status(201).json({
            message:"Created Successfully",
           createdChat
        })
            }catch(error){
                console.log(error);
                return res.status(500).json({
                    message: "Internal error"
                })
            }
}


    const getChat = async(req,res)=>{
        
      try { 
        const {workspaceId} = req.params;

        const matchworkspace = await Workspace.findById( workspaceId)

        if(!workspace){
            return res.status(404).json({
                message : "not found"
            })
        }

       if(matchworkspace.owner.toString() !== req.currentUser.id){
                return  res.status(403).json({
                    message : "Forbidden"
                })
       }

        const chats = await Chat.find({workspace : workspaceId})
            return res.status(200).json({
                message : "Fetched Successfully",
                chats
            })

        } catch(error){
            console.log(error);
            return res.status(500).json({
                message : "Internal error"
            })
        }
    }


    module.exports = {createChat , getChat}