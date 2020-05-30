const Post = require("../models/post");
const formidable = require('formidable')
const fs=  require('fs');
const _ = require('lodash');
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
exports.getAllPost = (req,res)=>{
      Post.find({})
      .select("-photo")
      .sort("-createdAt")
      .populate("postedBy")
      .exec((err,posts)=>{
          if(err){
              return res.status(404).json({
                  error:"no post found"
              });
          }
          return  res.json(posts);
      })
};




exports.createPost = (req,res)=>{
   

  let form = new formidable.IncomingForm();
 
  form.parse(req, (err, fields, file) => {
    if (err) {
        return res.status(400).json({
            error: "problem with image"
          });
    }

    const {title,description } = fields;
    if(!title || !description){

        return res.status(400).json({
            error: "please include title and description both"
          });
    }
    const post = new Post(fields);
    if (file.photo) {
        if (file.photo.size > 2000000) {
          return res.status(400).json({
            error: "File size too big!"
          });
        }
        post.photo.data = fs.readFileSync(file.photo.path);
        post.photo.contentType = file.photo.type;
      }
    post.save((err,post)=>{
        if(err){
             res.status(404).json({
                error:"post not created"
            });
        }
          res.json(post);

    });

});

   

};

exports.getPostById = (req,res,next,id)=>{
  id = mongoose.Types.ObjectId(id);
  console.log("inside getpostbyid");
  Post.findById(id)
  .populate("postedBy")
  .exec((err,pro)=>{
    console.log(err);
    console.log(pro);

    
   if(err){
      return res.status(400).json({
      err:"post not found"
      });
     }
   req.post = pro;
   next();
  });    
      
}

exports.photo = (req,res,next)=>{
  console.log(req.post);
  if(req.post.photo.data){
   res.set("Content-Type",req.post.photo.contentType);
   return res.send(req.post.photo.data);
  }
   console.log("failed");
};
