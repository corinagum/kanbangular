var express       = require('express');
var session       = require('express-session');
var app           = express();
var bodyParser    = require('body-parser');
var db            = require('./models');
var User          = db.User;
var Task          = db.Task;
var bcrypt        = require('bcrypt');
var middlewareValidator = require('./lib/middleware-validator.js');
var addTaskKeyValidator = middlewareValidator(['title', 'priority', 'description', 'assignedTo'], 'task');
var registerKeyValidator = middlewareValidator(['username', 'password', 'email', 'firstName', 'lastName'], 'register');
var loginKeyValidator = middlewareValidator(['username', 'password'], 'auth');
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

function validateEmail(req, res, next){
  if((/.+@.+\..+/i).test(req.body.register.email)) {
    next();
  } else {
    res.send({
      success : false,
      message : "Invalid email"
    });
  }
}

app.post('/register', registerKeyValidator, validateEmail, function(req,res){
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
            password : hash,
            email : req.body.register.email,
            firstName : req.body.register.firstName,
            lastName : req.body.register.lastName
          });
        });
      });
      req.session.user = {
        username : req.body.register.username,
        firstName : req.body.register.firstName,
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

app.post('/login', loginKeyValidator, function(req, res) {
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
            username : user.username,
            firstName : user.firstName,
            id : user.id
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

app.get('/authStatus', function(req, res){
  if(req.session.hasOwnProperty('user')){
    res.send({
      success : true,
      firstName : req.session.user.firstName,
      username : req.session.user.username
    });
  } else {
    res.send({success : false});
  }
});

// app.get('/archive', function(req, res) {
//   res.send({ success : true });
// });

// ****************************************
// CRUD Operations
app.get('/api', function(req, res) {
  Task.findAll()
    .then(function(tasks) {
      res.send(tasks);
    });
});

app.post('/api', validateUser, addTaskKeyValidator, function(req, res) {
  Task.create({
    title : req.body.task.title,
    priority: req.body.task.priority,
    status : "To Do",
    description : req.body.task.description,
    assignedTo : req.body.task.assignedTo,
    createdBy : req.session.user.firstName,
    UserId : req.session.user.id
  })
  .then(function(task) {
    Task.findAll()
      .then(function(data){
        res.send(data);
      });
  });
});

app.put('/api', validateUser, function(req, res) {
  Task.update({
    title : req.body.task.title,
    description : req.body.task.description,
    priority : req.body.task.priority,
    status : req.body.task.status,
    assignedTo : req.body.task.assignedTo
  }, {
    where : {
      id : req.body.task.id
    }
  })
  .then(function(task) {
    Task.findAll()
      .then(function(data){
        res.send({
          success : true,
          tasks : data
        });
      });
  });
});

app.delete('/api/:id', validateUser, function(req, res) {
  Task.destroy( {
    where : {
      id : req.params.id
  }})
  .then(function(data){
    Task.findAll()
      .then(function(tasks){
        res.send({
          success : true,
          tasks : tasks
        });
      });
  });
});

//Angular fall-through route
app.get('*', function(req, res){
  res.sendFile('/public/index.html', { root : __dirname});
});

var server = app.listen(process.env.PORT || 4000, function() {
  db.sequelize.sync();
});
