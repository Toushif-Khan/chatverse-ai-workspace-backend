 const Workspace = require("../models/Workspace")


const createWorkspace = async(req,res)=>{
    try{
        const {name , icon} = req.body;

        if(!name){
            return res.status(400).json({
                message : "name required"
            })
        }

      const newWorkspace = await Workspace.create({

                owner : req.currentUser.id,  // user id sent by middleware attached to req object
                name: name,
                icon: icon
       });

       const createdWorkspace = {
            message : "Workspace Created Successfully",

            workspace:{
              _id : newWorkspace._id,  //workspace id created by mongodb
             name : newWorkspace.name,
             icon : newWorkspace.icon
            }
       };

       return res.status(201).json(createdWorkspace);

        }catch(error){
            console.log(error);
            return res.status(500).json({
                message : "Internal error"
            })
        }

}

module.exports = createWorkspace;