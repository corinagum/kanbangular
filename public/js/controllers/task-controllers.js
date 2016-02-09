angular.module('app')
  .controller('NewTaskController', ['$scope', 'TaskService', function ($scope, TaskService) {
    console.log(TaskService.addTask);
    $scope.addTask = TaskService.addTask;
  }])
  .controller('TaskController', ['$scope', 'TaskService', function ($scope, TaskService) {
    $scope.getTasks = TaskService.getTasks;
    $scope.nextStatus = TaskService.nextStatus;
  }]);