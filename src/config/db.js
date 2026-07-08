const  mongoose  = require("mongoose");



function connectdb(){ 

mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connected to MONGODB")
}).catch((error)=>{
            console.log(error)
})

}


module.exports = connectdb;