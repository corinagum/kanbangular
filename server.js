var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var db            = require('./models');
var User          = db.User;
var Task          = db.Task;

app.use(bodyParser.json());
app.use(express.static('public'));

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

app.post('/register', function(req,res){

});

var server = app.listen(4000, function() {
  console.log('Server online at ', server.address());
  db.sequelize.sync();
});
