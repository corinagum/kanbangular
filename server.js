var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var db            = require('./models');
var User          = db.User;
var Task          = db.Task;

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api', function(req, res) {
  Task.find()
    .then(function(tasks) {
      console.log(tasks);
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
  });
});

app.put('/api', function(req, res) {
  for (var i = 0; i < tasks.length; i++) {
    if(tasks[i].id === req.body.task.id) {
      tasks[i].title = req.body.task.title;
      tasks[i].description = req.body.task.description;
      tasks[i].priority = req.body.task.priority;
    }
  }
});

app.delete('/api/:id', function(req, res) {
  for (var i = 0; i < tasks.length; i++) {
    if(tasks[i].id === req.params.id) {
      tasks.splice(i, 1);
    }
  }
});

var server = app.listen(4000, function() {
  console.log('Server online at ', server.address());
  db.sequelize.sync();
});
