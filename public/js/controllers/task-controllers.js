angular.module('app')
  .controller('TaskController', ['$scope', 'TaskService', function ($scope, TaskService) {

      TaskService.getTasks()
        .then(function successCallback(response) {
          // console.log(deferred.promise.inspect().state);
          $scope.tasks = response.data;
        });
      $scope.nextStatus = TaskService.nextStatus;


      $scope.addTask = function (newTask) {
          TaskService.addTask(newTask)
          .then(function(response) {
            console.log(response);
              $scope.tasks = response.data;
          }, function(err) {
            console.log(err);
          });
      };


      $scope.editTask = function(task) {
        TaskService.editTask(task);
        for (var i = 0; i < $scope.tasks.length; i++) {
          if($scope.tasks[i].id === task.id) {
            $scope.tasks[i].title = task.title;
            $scope.tasks[i].description = task.description;
            $scope.tasks[i].priority = task.priority;
          }
        }
      };

      $scope.deleteTask = function (task) {
        TaskService.deleteTask(task);
      for (var i = 0; i < $scope.tasks.length; i++) {
        if($scope.tasks[i].id === task.id) {
          $scope.tasks.splice(i, 1);
        }
      }
      };

    }]);

