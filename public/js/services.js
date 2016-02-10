angular.module('app')
    .service("TaskService", ['$http', function ($http) {

// START CRUD OPERATIONS \\
// GET
    this.getTasks = function() {
      return $http.get('/api');
    };
// POST
    this.addTask = function(task) {
      return $http.post('/api', {
        task: task
      });
    };

// PUT
  this.editTask = function(task) {
    return $http.put('/api', {
      task : task
    });
  };

  this.nextStatus = function(task) {
    if(task.status === "To Do") {
      task.status = "In Progress";
    } else {
      task.status = "Done";
    }
    return $http.put('/api', {
        task : task
      });
    };

// DELETE
    this.deleteTask = function(task) {
      return $http.delete('/api/' + task.id);
    };
}]);