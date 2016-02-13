angular.module('app')
  .controller('TaskController', ['$scope', 'TaskService', function ($scope, TaskService) {

    TaskService.getTasks()
      .then(function successCallback(response) {
        $scope.tasks = response.data;
      });

    $scope.nextStatus = function(task){
      var tempTask = angular.copy(task);
      if(tempTask.status === "To Do") {
        tempTask.status = "In Progress";
      } else {
        tempTask.status = "Done";
      }
      TaskService.nextStatus(tempTask)
        .then(function(response) {
          if(response.data.success){
            $scope.tasks = response.data.tasks;
          } else {
            $scope.addTaskMessage = response.data.message;
          }
        }, function(err) {
      });
    };

    $scope.prevStatus = function(task){
      var tempTask = angular.copy(task);
      if(tempTask.status === "Done") {
        tempTask.status = "In Progress";
      } else {
        tempTask.status = "To Do";
      }
      TaskService.prevStatus(tempTask)
        .then(function(response) {
          if(response.data.success){
            $scope.tasks = response.data.tasks;
          } else {
            $scope.addTaskMessage = response.data.message;
          }
        }, function(err) {
      });
    };

    $scope.addTask = function (newTask) {
        TaskService.addTask(newTask)
        .then(function(response) {
          if(response.data.success === false){
            $scope.addTaskMessage = response.data.message;
          } else {
            $scope.tasks = response.data;
          }
        }, function(err) {
        });
    };

    $scope.editTask = function(task) {
      TaskService.editTask(task)
        .then(function(response) {
          if(response.data.success){
            $scope.tasks = response.data.tasks;
          } else {
            $scope.addTaskMessage = response.data.message;
          }
        }, function(err) {
      });
    };

    $scope.deleteTask = function (task) {
      TaskService.deleteTask(task)
        .then(function(response) {
          if(response.data.success){
            $scope.tasks = response.data.tasks;
          } else {
            $scope.addTaskMessage = response.data.message;
          }
        }, function(err) {
      });
    };


    }]);

