const express = require("express");
const messageRoutes = express.Router({mergeParams:true});
const {createMsg,getMsg,getOneMsg,deleteMsg}= require("../controllers/messageController");
const  authMiddleware = require("../middlewares/authMiddleware");


messageRoutes.post("/",authMiddleware,createMsg);
messageRoutes.get("/",authMiddleware,getMsg);
messageRoutes.get("/:id",authMiddleware,getOneMsg);
messageRoutes.delete("/:id",authMiddleware,deleteMsg);

  
module.exports = messageRoutes;