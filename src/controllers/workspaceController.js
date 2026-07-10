


const createWorkspace = async(req,res)=>{
    const {name , icon} = req.body;

        if(!name){
            return res.status(400).json({
                message : "All fields required"
            })
        }

            

}