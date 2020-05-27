const express = require("express");
const router = express.Router();
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById,getUser,updateUser} = require('../controllers/user');
const {getAllPost,createPost} = require("../controllers/post");

router.param("userId",getUserById);
router.get("/posts",getAllPost);

router.post("/user/:userId/createPost",isSignedIn,isAuthenticated,createPost);

module.exports = router;