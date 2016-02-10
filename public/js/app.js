angular.module("app", ['ngRoute', 'xeditable']);

var app = angular.module("app");

app
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl : 'views/tasks.html',
        controller : "TaskController"
      })
      .when('/login', {
        templateUrl : 'views/login.html',
        controller : "UserController"
      })
      .when('/register', {
        templateUrl : 'views/register.html',
        controller : "UserController"
      })
      .when('/logout', {
        controller : "UserController"
      })
      .otherwise({
        templateUrl : 'views/404.html'
    });
    $locationProvider.html5Mode({
      enabled : true,
      requireBase : false
    });
  }])
  .run(function(editableOptions){
    editableOptions.theme = 'bs3';
  });