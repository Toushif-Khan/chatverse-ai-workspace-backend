const express = require("express");
const workspaceRoutes = express.Router();
const createWorkspace = require("../controllers/workspaceController");
const authMiddleware = require("../middlewares/authMiddleware");

workspaceRoutes.post("/",authMiddleware,createWorkspace);





module.exports = workspaceRoutes;
