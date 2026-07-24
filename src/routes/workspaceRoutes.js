const express = require("express");
const workspaceRoutes = express.Router();
const {createWorkspace , getWorkspace , getOneWorkspace} = require("../controllers/workspaceController");
const authMiddleware = require("../middlewares/authMiddleware");

workspaceRoutes.post("/",authMiddleware,createWorkspace);
workspaceRoutes.get("/",authMiddleware,getWorkspace);
workspaceRoutes.get("/:id",authMiddleware,getOneWorkspace);



module.exports = workspaceRoutes;
