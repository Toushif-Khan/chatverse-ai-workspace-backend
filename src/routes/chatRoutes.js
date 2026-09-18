const express = require("express");
const chatRoutes = express.Router({mergeParams:true});
const {createChat,getChat,getOneChat,updateChat,deleteChat} = require("../controllers/chatController")
const authMiddleware = require("../middlewares/authMiddleware")

chatRoutes.post("/",authMiddleware,createChat);
chatRoutes.get("/",authMiddleware,getChat);
chatRoutes.get("/:id",authMiddleware,getOneChat);
chatRoutes.put("/:id",authMiddleware,updateChat);
chatRoutes.delete("/:id",authMiddleware,deleteChat);

module.exports = chatRoutes;      