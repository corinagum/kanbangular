var express       = require('express');
var session       = require('express-session');
var app           = express();
var bodyParser    = require('body-parser');
var db            = require('./models');
var User          = db.User;
var Task          = db.Task;
var bcrypt        = require('bcrypt');


app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'keyboard cat',
  cookie: { maxAge: 60000000 }
}));

// ****************************************
// MIDDLEWARE

function validateUser(req, res, next) {
  if(req.session.hasOwnProperty('user')) {
    return next();
  } else {
    res.send({
      success : false,
      message : "Please sign in or register"
    });
  }
}


app.post('/register', function(req,res){
  User.findOne({
    where:{
      username: req.body.register.username
    }
  })
  .then(function(data){
    if(!data){
      bcrypt.genSalt(10, function(err,salt){
        bcrypt.hash(req.body.register.password, salt, function(err,hash){
          User.create({
            username : req.body.register.username,
            password : hash
          });
        });
      });
      req.session.user = {
            username : req.body.register.username,
            firstName : req.body.firstName
          };
      res.send({
        success : true,
        message : "Registered as username: " + req.body.register.username,
        firstName : req.body.register.firstName,
        username : req.body.register.username
      });
    }
    if(data){
      res.send({
        success : false,
        message : "User already exists, please select new username"
      });
    }
  });
});

app.get('/logout', function(req,res){
  if(req.session.hasOwnProperty('user')){
    delete req.session.user;
    res.send({
      success : true,
      message : "You have been logged out"
    });
  } else {
    res.send({
      success : false,
      message : "You are not logged in"
    });
  }
});

app.post('/login', function(req, res) {
  User.findOne({
    where: {
      username : req.body.auth.username
  }})
  .then(function(user) {
    if(!user) {
      return res.send({
        success : false,
        message : 'Username not found'
      });
    } else {
      bcrypt.compare(req.body.auth.password, user.password, function(err, valid){
        if(valid === true){
          req.session.user = {
            username : req.body.auth.username,
            firstName : user.firstName
          };
          res.send({
            success: true,
            firstName : user.firstName,
            username : user.username,
            message : "Successfully logged in"
          });
        }
        if(valid === false){
          res.send({
            success : false,
            message : 'Incorrect password'
          });
        }
      });
    }
  });
});

// ****************************************
// CRUD Operations
app.get('/api', function(req, res) {
  Task.findAll()
    .then(function(tasks) {
      res.send(tasks);
    });
});

app.post('/api', validateUser, function(req, res) {
  Task.create({
    title : req.body.task.title,
    priority: req.body.task.priority,
    status : "To Do",
    description : req.body.task.description,
    assignedTo : "a person",
    UserId : 1
  })
  .then(function(task) {
    Task.findAll()
      .then(function(data){
        res.send(data);
      });
  });
});

app.put('/api', function(req, res) {
  Task.update({
    title : req.body.task.title,
    description : req.body.task.description,
    priority : req.body.task.priority,
    status : req.body.task.status
  }, {
    where : {
      id : req.body.task.id
    }
  })
  .then(function(task) {
    Task.findAll()
      .then(function(data){
        res.send(data);
      });
  });
});

app.delete('/api/:id', function(req, res) {
  Task.destroy( {
    where : {
      id : req.params.id
    }});
});

//Angular fall-through route
app.get('*', function(req, res){
  res.sendFile('/public/index.html', { root : __dirname});
});

var server = app.listen(4000, function() {
  db.sequelize.sync();
});
