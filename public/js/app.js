angular.module("app", ['ngRoute', 'xeditable', 'ngAnimate']);

var app = angular.module("app");

app
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl : 'views/tasks.html',
        controller : "TaskController"
      })
      .when('/login', {
        templateUrl : 'views/login.html'
      })
      .when('/register', {
        templateUrl : 'views/register.html'
      })
      .when('/logout', {
        controller : "NavController"
      })
      .when('/archive', {
        templateUrl : 'views/archive.html',
        controller : "TaskController"
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