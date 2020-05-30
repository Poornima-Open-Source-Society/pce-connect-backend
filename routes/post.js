const express = require("express");
const router = express.Router();
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById,getUser,updateUser} = require('../controllers/user');
const {getAllPost,createPost,photo,getPostById} = require("../controllers/post");

router.param("postId",getPostById);
router.param("userId",getUserById);
router.get("/posts",getAllPost);

router.post("/user/:userId/createPost",isSignedIn,isAuthenticated,createPost);
router.get("/photo/:postId",photo);
module.exports = router;