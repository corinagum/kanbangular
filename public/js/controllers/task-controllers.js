angular.module('app')
  .controller('TaskController', ['$scope', 'TaskService', function (scope, TaskService) {
    $scope.TaskService = TaskService;
  }]);