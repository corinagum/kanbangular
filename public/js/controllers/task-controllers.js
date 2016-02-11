angular.module('app')
  .controller('TaskController', ['$scope', 'TaskService', function ($scope, TaskService) {

    TaskService.getTasks()
      .then(function successCallback(response) {
        $scope.tasks = response.data;
      });

    $scope.nextStatus = function(task){
      TaskService.nextStatus(task)
        .then(function(response) {
            $scope.tasks = response.data;
        }, function(err) {
          console.log(err);
        });
    };

    $scope.addTask = function (newTask) {
        TaskService.addTask(newTask)
        .then(function(response) {
          if(response.data.success === false){
            console.log("not auth to add", response);
          } else {
            $scope.tasks = response.data;
          }
        }, function(err) {
          console.log(err);
        });
    };

    $scope.editTask = function(task) {
      TaskService.editTask(task)
        .then(function(response) {
            $scope.tasks = response.data;
        }, function(err) {
          console.log(err);
      });
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

