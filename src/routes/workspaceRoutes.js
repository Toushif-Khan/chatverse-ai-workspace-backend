const express = require("express");
const workspaceRoutes = express.Router();
const {createWorkspace , getWorkspace} = require("../controllers/workspaceController");
const authMiddleware = require("../middlewares/authMiddleware");

workspaceRoutes.post("/",authMiddleware,createWorkspace);
workspaceRoutes.get("/",authMiddleware,getWorkspace);




module.exports = workspaceRoutes;
