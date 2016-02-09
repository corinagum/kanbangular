angular.module('app')
  .controller('NewTaskController', ['$scope', '$rootScope', 'TaskService', function ($scope, $rootScope, TaskService) {
      $rootScope.tasks = [];
      $scope.addTask = function (newTask) {
        TaskService.addTask(newTask);
        var nextId = $rootScope.tasks.length + 1;
        newTask.status = "To Do";
        // createdBy : task.creator,
        // assignedTo : task.assignedTo
        $rootScope.tasks.push(newTask);
      };
      TaskService.getTasks()
      .then(function successCallback(response) {
        if(response !== null) {
          if(!Array.isArray(response.data)) {
            $rootScope.tasks = [response.data];
          } else {
            $rootScope.tasks = response.data;
          }
        }
      });
    }])

  .controller('TaskController', ['$scope', '$rootScope','TaskService', function ($scope, $rootScope, TaskService) {
    TaskService.getTasks()
      .then(function successCallback(response) {
        $rootScope.getTasks = response.data;
      });
    $scope.nextStatus = TaskService.nextStatus;

    $scope.editTask = function(task) {
      TaskService.editTask(task);
      for (var i = 0; i < $rootScope.tasks.length; i++) {
        if($rootScope.tasks[i].id === task.id) {
          $rootScope.tasks[i].title = task.title;
          $rootScope.tasks[i].description = task.description;
          $rootScope.tasks[i].priority = task.priority;
        }
      }
    };

    $scope.deleteTask = function (task) {
      TaskService.deleteTask(task);
    for (var i = 0; i < $rootScope.tasks.length; i++) {
      if($rootScope.tasks[i].id === task.id) {
        $rootScope.tasks.splice(i, 1);
      }
    }
    };
  }]);