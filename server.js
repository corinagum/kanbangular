var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var db            = require('./models');
var User          = db.User;
var Task          = db.Task;
var passport      = require('passport');
var session       = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt');
var flash         = require('connect-flash');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new LocalStrategy({
  passReqToCallback: true
  },
  function(req, username, password, done){
    var user;
    Users.findOne({where : {
      username : username
    }})
    .then(function(data){
      user = data;
      if(!user){
        // req.flash("messages", "User does not exist");
        return done(null, false);
      }
      bcrypt.compare(password, user.password, function(err, res){
        if(user.username === username && res === false){
          // req.flash("messages", "Password incorrect");
          return done(null, false);
        }
        if(user.username === username && res === true){
          userId = user.id;
          loggedInChecker=true;
          return done(null, user);
        }
      });
    });
  }
));


// User Authentication
// app.get('/login', function(req,res){
//   res.sendFile('public/views/index.html');
// });

app.get('/register', function(req,res){
  // res.render('photos/register', {messages : req.flash('messages')});
});

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
          })
          .then(function (data) {
            req.login(data, function(err) {
              if (err) { return next(err); }
              return res.redirect('/');
            });
          });
        });
      });
    } else {
      // req.flash('messages', 'Username taken');
      res.redirect('/register');
    }
  });
});

app.get('/logout', function(req,res){
  // loggedInChecker=false;
  // req.logout();
  // res.redirect('/login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/login',
  // failureFlash : true,
  // succesFlash : true
}));

// CRUD Operations
app.get('/api', function(req, res) {
  Task.findAll()
    .then(function(tasks) {
      res.send(tasks);
    });
});

app.post('/api', function(req, res) {
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
  console.log('Server online at ', server.address());
  db.sequelize.sync();
});
