var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var tasks         = [{
  id : "Task-ID #001",
  title : "wash Zuko",
  priority : 1,
  status : "To Do",
  createdBy : "Corina",
  description : "Put Zuko in shower and shampoo him, then rinse. Don't forget to dry him. Shake is inside shower, not out",
  assignedTo : "Steven"
}];

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api', function(req, res) {
    res.send(tasks);
});

app.post('/api', function(req, res) {
  var nextId = tasks.length + 1;
  var newTask = req.body.task;
  newTask.id = "Task-ID #" + nextId;
  newTask.status = "To Do";
  // createdBy : task.creator,
  // assignedTo : task.assignedTo
  tasks.push(newTask);
  console.log(tasks);
});

var server = app.listen(4000, function() {
  console.log('Server online at ', server.address());
});
