const Event = require("../models/event");
const User = require("../models/user")
const formidable = require('formidable')
const fs=  require('fs');
const _ = require('lodash');
const mongoose = require('mongoose');

const ObjectId = require('mongodb').ObjectID;


exports.getEvents = (req,res)=>{
      Event.find({})
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

    let f = formidable.IncomingForm();
    f.parse(req,(err,fields,file)=>{
          if(err){
              return res.status(400).json({
              error:"something went wrong"  
            })
          }
          let event = new Event(fields);
          const {organiser} = fields;
          event.save((err,event)=>{
              if(err){
                  return res.status(404).json({
                      error:err
                  });
              }
            
             return  res.json(event);
          })

          
    });

};