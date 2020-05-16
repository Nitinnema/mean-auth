const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Users = require('./Models/user.model');
const UserSignup = require('./Models/usersignup.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

mongoose.connect("mongodb+srv://nitin:<password>@cluster0-ylur7.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useFindAndModify: false })
.then(() => {
  console.log("db connected");
})
.catch((err) => {
  console.log(err);
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// Add User to database
app.post('/users', (req, res) => {
  const users = new Users({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    car: req.body.car
  });
  // console.log(users);
  users.save();
  res.status(200).json({
    message: "user added successfully"
  });
});

// getting users
app.get('/users', (req, res) => {
  Users.find().then((data) => {
    res.status(200).json({
      message: "successfully",
      users: data
    });
  });
});

// getting single user
app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  Users.findById(id).then(result => {
    res.status(200).json({
      message: "successfully",
      user: result
    })
  })
});

// delete user
app.delete('/user/:id', (req, res) => {
  Users.findByIdAndDelete(req.params.id).
    then(result => {
      console.log(result);
      res.status(200).json({
        message: "User deleted successfully",
        users: result
      })
    })
}); 

// upadte user
app.put('/user/:id', (req, res) => {
  const users = {
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    car: req.body.car
  };
  // console.log(users);
  Users.findByIdAndUpdate(req.params.id, users).
    then(result => {
      res.status(200).json({
        message: "updated"
      })
    })
});

// Authorization Part
// User Sign up
app.post('/signup', (req, res) => {
  const userSignup = new UserSignup({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });
  console.log(userSignup);
  userSignup.save();
  res.status(200).json({
    message: "data saved"
  });
});

// Login Authentication and authorization
app.post('/login', (req, res, next) => {
  const SECRET = 'd12909dbfcca0c3d5ed7543acca8f3f6';
  UserSignup.findOne({ username: req.body.username }).
    then(user => {
      if (!user) {
        console.log('No record found');
        res.status(400);
      } else {
        if (user.username && bcrypt.compareSync(req.body.password, user.password)) {
          var expiry = new Date();
          expiry.setDate(expiry.getDate() + 7);
          // create jwt token
          const jwttoken = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email,
            exp: parseInt(expiry.getTime() / 1000)
          }, SECRET);
          console.log('successfully signed in');
          res.status(200).json({
            message: "logged in",
            token: jwttoken
          });
        } else {
          console.log('wrong password');
          res.status(400);
        }
      }
    });
});


module.exports = app;
