angular.module('app')
  .controller('TaskController', ['$scope', '$rootScope', '$location', 'TaskService', 'moment', '$window', function ($scope, $rootScope, $location, TaskService, moment, $window) {

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
            $location.path('/login');
            // $scope.message = response.data.message;
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
            $location.path('/login');
            // $scope.message = response.data.message;
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
            $location.path('/login');
            // $scope.addTaskMessage = response.data.message;
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
            $location.path('/login');
            // $scope.modifyTaskMessage = response.data.message;
          }
        }, function(err) {
      });
    };

    $scope.deleteAddTaskMessage = function(){
      $scope.addTaskMessage = null;
    };

    $scope.formatDate = function(date) {
      return moment(date).format('MM/dd/yyyy');
    };



    $scope.$watch(function(){
      return $window.innerWidth;
    }, function(value){
      if(value < 800) {
      console.log(value);
        $scope.mobileToggleToDo = true;
        $scope.mobileToggleInProgress = true;
        $scope.mobileToggleDone = true;
        $scope.mobileToggleNewTask = false;


        $scope.mobileShowHideToDo = function(){
          $scope.mobileToggleToDo = !$scope.mobileToggleToDo;
          $scope.mobileToggleInProgress = false;
          $scope.mobileToggleDone = false;
        };

        $scope.mobileShowHideInProgress = function(){
        $scope.mobileToggleToDo = false;
        $scope.mobileToggleInProgress = !$scope.mobileToggleInProgress;
        $scope.mobileToggleDone = false;
        };

        $scope.mobileShowHideDone = function(){
          $scope.mobileToggleToDo = false;
          $scope.mobileToggleInProgress = false;
          $scope.mobileToggleDone = !$scope.mobileToggleDone;
        };
        $rootScope.mobileShowHideNewTask = function(){
          $scope.mobileToggleNewTask = !$scope.mobileToggleNewTask;
        };

      } else {
        $scope.mobileToggleToDo = true;
        $scope.mobileToggleInProgress = true;
        $scope.mobileToggleDone = true;
        $scope.mobileToggleNewTask = true;

        $scope.mobileShowHideToDo = function(){};
        $scope.mobileShowHideInProgress = function(){};
        $scope.mobileShowHideDone = function(){};
        $rootScope.mobileShowHideNewTask = function(){};
      }
    });

    }]);

