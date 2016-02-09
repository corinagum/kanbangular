angular.module('app')
  .controller('NewTaskController', ['$scope', '$rootScope', 'TaskService', function ($scope, $rootScope, TaskService) {
      $scope.addTask = function (newTask) {
        TaskService.addTask(newTask)
        .then(function successCallback(response) {
          TaskService.getTasks()
          .then(function successCallback(response) {
            $rootScope.getTasks = response.data;
            console.log($rootScope.getTasks);
          });
        });
      };
    }])

  .controller('TaskController', ['$scope', '$rootScope','TaskService', function ($scope, $rootScope, TaskService) {
    TaskService.getTasks()
      .then(function successCallback(response) {
        $rootScope.getTasks = response.data;
      });
    $scope.nextStatus = TaskService.nextStatus;
  }]);