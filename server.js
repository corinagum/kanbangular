var express       = require('express');
var session       = require('express-session');
var app           = express();
var bodyParser    = require('body-parser');
var db            = require('./models');
var User          = db.User;
var Task          = db.Task;


app.use(bodyParser.json());
app.use(express.static('public'));

app.use(session({
  secret: 'keyboard cat',
  cookie: { maxAge: 60000000 }
}));

// ****************************************
// MIDDLEWARE

function validateUser(req, res, next) {
  if(req.session.hasOwnProperty('user')) {
    return next();
  } else {
    return res.send({
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
          User.create({
            username : req.body.register.username,
            password : req.body.register.password
          });
      req.session.user = {
        username : req.body.register.username
      };
    } else {
      res.send({success : false});

    }
  });
});

app.get('/logout', function(req,res){
  delete req.session.user;
  res.send({
    success : true,
    message : "You have been logged out"
  });
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
        message : 'login not found'
      });
      }
      if(user.password === req.body.auth.password) {
        req.session.user = {
                username : req.body.auth.username
              };
        res.send({
          success: true,
          firstName : user.firstName,
          username : user.username
        });
      } else {
        res.send({
          success : false,
          message : 'incorrect login credentials'
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
