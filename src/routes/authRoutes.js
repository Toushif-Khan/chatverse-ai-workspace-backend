const express = require("express");
const authRoutes = express.Router();
const registerUser = require("../controllers/authController")

authRoutes.post("/register",registerUser);


module.exports = authRoutes;