const express = require("express");
const router = express.Router();
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById,getUser,updateUser,getUsers} = require('../controllers/user');

router.param("userId",getUserById);
router.get("/user/:userId",isSignedIn,isAuthenticated,getUser);
router.get("/users",getUsers);


router.put("/user/:userId",isSignedIn,isAuthenticated,updateUser);

module.exports = router;