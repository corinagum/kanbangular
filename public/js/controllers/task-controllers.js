angular.module('app')
  .controller('NewTaskController', ['$scope', '$rootScope', 'TaskService', function ($scope, $rootScope, TaskService) {
      $scope.addTask = function (newTask) {
        TaskService.addTask(newTask);
        var nextId = $rootScope.tasks.length + 1;
        newTask.id = "Task-ID #" + nextId;
        newTask.status = "To Do";
        // createdBy : task.creator,
        // assignedTo : task.assignedTo
        $rootScope.tasks.push(newTask);
      };
      TaskService.getTasks()
      .then(function successCallback(response) {
        $rootScope.tasks = response.data;
      });
    }])

  .controller('TaskController', ['$scope', '$rootScope','TaskService', function ($scope, $rootScope, TaskService) {
    TaskService.getTasks()
      .then(function successCallback(response) {
        $rootScope.getTasks = response.data;
      });
    $scope.nextStatus = TaskService.nextStatus;

    $scope.deleteTask = function (task) {
      TaskService.deleteTask(task);
    for (var i = 0; i < $rootScope.tasks.length; i++) {
      if($rootScope.tasks[i].id === task.id) {
        $rootScope.tasks.splice(i, 1);
      }
    }
    };
  }]);