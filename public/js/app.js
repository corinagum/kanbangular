angular.module("app", ['ngRoute']);

var app = angular.module("app");

app
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
      .when('/', {
        templateUrl : 'views/tasks.html'
      })
      .otherwise({
        templateUrl : 'views/404.html'
    });
    $locationProvider.html5Mode({
      enabled : true,
      requireBase : false
    });
  }])
  .run(function(){
    //initialize
  });