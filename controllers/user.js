const User  = require("../models/user");

exports.getUserById = (req,res,next,id)=>{
   User.findById(id).exec((err,user)=>{
       if(err|| !user){
            return res.status(400).json({
            	err:"no user found in db"
            });
       }
       req.profile = user;
       next();
   });
};

exports.getUsers = (req,res,)=>{
   User.find({}).exec((err,user)=>{
       if(err|| !user){
            return res.status(400).json({
            	err:"no user found in db"
            });
       }
       return res.json(user);
   });
};

exports.getUser=(req,res)=>{
	//todo get back here for pass
	req.profile.salt = undefined;
	req.profile.encry_password=undefined;
	req.profile.updatedAt=undefined;
	req.profile.createdAt=undefined;
      return res.json(req.profile);
};
exports.updateUser = (req,res)=>{
    User.findOneAndUpdate({_id:req.profile._id},
    	{$set:req.body},{new:true}).exec((err,user)=>{
            if(err || !user){ return res.status(400).json({
               err:"update unsucessfull"
            }); 
               }
            user.salt = undefined;
	        user.encry_password=undefined;
	        return res.json(user);
    	} );
    	
};
exports.userEventList = (req,res)=>{
     Event.find({organiser:req.profile.name})
     .populate("organiser","_.id name")
     .exec((err,event)=>{
          if(err)return res.status(400).json({
          	err:"no event in this acount"
          });
          	return res.json(event);
     });
};
//todo
exports.pushEventInUserList=(req,res,next)=>{
      //store array in db
      User.findOneAndUpdate({_id:req.profile._id},
      	{$push:{purchases:purchases}},
      	{new:true},
      	(err,purchaseList)=>{
             if(err){
             	return res.status(400).json({
             		err:"unable to save purchase list"
             	})
             }
             next();
      	});
};
