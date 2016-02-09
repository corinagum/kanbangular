angular.module('app')
    .service("TaskService", ['$http', function ($http) {

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

    this.nextStatus = function(task) {
      if(task.status === "To Do") {
        task.status = "In Progress";
      } else {
        task.status = "Done";
      }
    };

}]);