const Post = require("../models/post");
const formidable = require('formidable')
const fs=  require('fs');
const _ = require('lodash');

exports.getAllPost = (req,res)=>{
      Post.find({})
      .select("-photo")
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