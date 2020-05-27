var mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const {ObjectId} = mongoose.Schema;

var Schema = mongoose.Schema;
 const eventsSchema = new Schema({
    type:String
 });
var userSchema = new Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    section:{
        type:String,
        maxlength:2
    },
    salt:String,
    encry_password:{
    	type:String,
    	required:true
    },
    role:{
        type:String,
        enum:['student','faculty','admin'],
        default:'student',
    },
    organised:[eventsSchema]
},{timestamps:true});

userSchema.virtual("password")
    .set(function(password){
          this._password = password;
          this.salt = uuidv1();
          this.encry_password = this.securePassword(password);
    })
    .get(function(){
    	return this._password;
    });

 userSchema.methods = {
  authenticated: function(plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function(plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  }
};
module.exports = mongoose.model("User",userSchema);