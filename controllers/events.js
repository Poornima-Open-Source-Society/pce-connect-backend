const Event = require("../models/event");
const User = require("../models/user")
const formidable = require('formidable')
const fs=  require('fs');
const _ = require('lodash');
const mongoose = require('mongoose');

const ObjectId = require('mongodb').ObjectID;


exports.getEvents = (req,res)=>{
      Event.find({})
      .sort('-createdAt')
      .populate("organiser","_.id name")
      .exec((err,events)=>{
          if(err){
              return res.status(404).json({
                  error:"no event found"
              });
          }
          return  res.json(events);
      })
};
exports.createEvent = (req,res)=>{
    const event = new Event(req.body);
    console.log(req.body);
    req.body.organiser =mongoose.Types.ObjectId(req.body.organiser);
    console.log(req.body);
    event.save((err,ev)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                error:"failed here"
            });
        }
        else {
            console.log(ev);

            return res.json({
                message:"event created successfully"
            })
        }
    })
   
};