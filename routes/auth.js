const express = require('express');
require('dotenv').config();
const router = express.Router();
//routs
const {signout,signup,signin,isSignedIn} = require('../controllers/auth'); 
const {check,validationResult} = require('express-validator');
router.post("/signup",[
    check("email","email is required and must be in correct format").isEmail(),
    check("password","password should be atleast 5 char long").isLength({min:5})
  
	],signup);


router.post("/signin",[
    check("email","email is required and must be in correct format").isEmail(),
    check("password","password is required").isLength({min:5})
	],signin);

router.get("/signout",signout);


router.get("/test",isSignedIn,(req,res)=>{
	res.json(req.auth);
});
module.exports = router;