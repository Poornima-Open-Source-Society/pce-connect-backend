const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const eventSchema = new mongoose.Schema(
    {
    	name:{
    		type:String,
    		maxlength:32,
    		required:true,
    		trim:true
        },
        description:{
            type:String,
    		maxlength:320,
    		required:true
        },
        organiser:{
            type:ObjectId,
            ref:"User"
        },
        fees:{
            type:Number
        },
        venue:{
            type:String,
    		maxlength:30,
    		required:true
        },
        goingCount:Number,
        isSigned:Boolean
    },{timestamps:true});

module.exports = mongoose.model("Event",eventSchema);