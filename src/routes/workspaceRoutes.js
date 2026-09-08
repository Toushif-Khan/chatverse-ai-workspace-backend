const express = require("express");
const workspaceRoutes = express.Router();
const {createWorkspace , getWorkspace , getOneWorkspace ,updateWorspace,deleteWorkspace} = require("../controllers/workspaceController");
const authMiddleware = require("../middlewares/authMiddleware");

workspaceRoutes.post("/",authMiddleware,createWorkspace);
workspaceRoutes.get("/",authMiddleware,getWorkspace);
workspaceRoutes.get("/:id",authMiddleware,getOneWorkspace);
workspaceRoutes.put("/:id",authMiddleware,updateWorspace);
workspaceRoutes.delete("/:id",authMiddleware,deleteWorkspace);


module.exports = workspaceRoutes;
