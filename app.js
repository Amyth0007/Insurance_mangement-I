//jshint esversion:6
// require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect("mongodb://localhost:27017/Lalit", {useNewUrlParser: true});
// mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema ({
  phone: Number,
  username: String,
  email: String,
  password: String

});
const User = new mongoose.model("User", userSchema);
app.get("/", function(req, res){
    res.render('index')
})
app.get("/signin", function(req, res){
    res.render('signin')
})
app.get("/login", function(req, res){
    res.render('login')
})
app.post('/signin', function(req, res){
    const user = new User({
        username: req.body.name,
        email: req.body.email,
        phone:req.body.pnumber,
        password:req.body.passcode

    })
    console.log(user);
    user.save(user, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
})
app.post('/login', function(req, res){
    
    // console.log(user);
    const username = req.body.email;
  const password = req.body.passcode;
  User.findOne({email: username} , function(err, founduser){
    console.log(founduser);
    if(founduser){
      if(password===founduser.password){
        // res.render('');
        res.redirect('/')

      }else{
        console.log(err);
      }
    }

   })
})







app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
