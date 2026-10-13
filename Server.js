require("dotenv").config();
const app = require("./src/App");
const connectdb = require("./src/config/db")

const PORT = process.env.PORT || 5000 


connectdb();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});