const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const userRoute = require('./routes/user');
const eventRoute = require('./routes/event');

const postRoute = require('./routes/post');

const authRoute = require('./routes/auth');

//db connection
try{
    mongoose.connect(process.env.DATABASE,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex:true
    })
    .then(()=>{
           console.log("db connected");
    });
    }catch(err){
         console.log("db not connected");
    };
app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8100");
      res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
      next();
    });
app.use(bodyParser.json());

    
app.use(cookieParser());
app.use(morgan('dev'));
    


//app.use(cors());

app.use("/api",userRoute);
app.use("/api",postRoute);
app.use("/api",eventRoute);
app.use("/api",authRoute);



const port = process.env.PORT || 8000;
//starting a server
app.listen(port,()=>{
	console.log(`app is running at ${port}`);
});


