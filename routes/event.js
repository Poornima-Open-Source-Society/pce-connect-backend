const express = require("express");
const router = express.Router();
const {isSignedIn,isAuthenticated,isAdmin} = require("../controllers/auth");
const {getUserById,getUser,updateUser} = require('../controllers/user');
const {getEvents,createEvent} = require("../controllers/events");

router.param("userId",getUserById);
router.get("/events",getEvents);

router.post("/user/:userId/createEvent",isSignedIn,isAuthenticated,createEvent);

module.exports = router;