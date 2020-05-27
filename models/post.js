const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema; 
const commentSchema = new mongoose.Schema({
      test:{
          type:String,
          maxlength:100
      },
      likes:Number
});

const postSchema = new mongoose.Schema({
	title:{
		type:String,
		required:true,
		trim:true,
		maxlength:40
	},
	postedBy:{
		type:ObjectId,
		ref:"User"
	},
	description:{
		type:String,
		maxlength:2000
	},
	likes:Number,
	photo:{
		data: Buffer,
		contentType:String
    },
    comments:[commentSchema]

},{timestamps:true});

module.exports = mongoose.model("Post",postSchema);