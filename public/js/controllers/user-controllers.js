angular.module('app')
  .controller('UserController', ['$scope', 'UserService', '$location', '$window',function ($scope, UserService, $location, $window) {

    $scope.isLoggedIn = function() {
      if($scope.loggedIn === "Not logged in") {
        return false;
      } else {
        return true;
      }
    };

    UserService.getUsers()
      .then(function successCallback(response) {
        $scope.users = response.data;
      });

    UserService.authStatus()
      .then(function(response){
        if(response.data.success){
          $scope.loggedIn = "Hi " + response.data.username + "!";
        } else {
          $scope.loggedIn = "Not logged in";
        }
      });

    $scope.login = function(auth) {
      UserService.login(auth)
        .then(function(response) {
          if(response.data.success) {
            $scope.firstName = response.data.firstName;
            $scope.loggedIn = "Hi " + response.data.username + "!";
            $location.path('/');
          }
          if(response.data.hasOwnProperty('message')){
            $scope.loginMessage = response.data.message;
          }
        });
    };

    $scope.signUp = function(register) {
      UserService.signUp(register)
        .then(function(response){
          if(response.data.success === false){
            $scope.registerMessage = response.data.message;
          } else {
            $scope.registerMessage = response.data.message;
            $scope.firstName = response.data.firstName;
            $scope.loggedIn = "Hi " + response.data.username + "!";
            $location.path('/');
          }
        });
    };

    $scope.logout = function(){
      UserService.logout()
        .then(function(response){
          if(response.data.success === true){
            $location.path('/login');
            $scope.loggedIn = "Not logged in";
          } else {
            $location.path('/login');
            $scope.message = "Cannot log out, not logged in.";
          }
        });
    };

    $scope.deleteMessage = function(){
      $scope.message = null;
      $scope.loginMessage = null;
      $scope.registerMessage = null;
    };

    $scope.$watch(function(){
      return $window.innerWidth;
    }, function(value){
      if(value < 800) {
        $rootScope.mobileToggleNewTask = false;

        $rootScope.mobileShowHideNewTask = function(){
          $rootScope.mobileToggleNewTask = !$rootScope.mobileToggleNewTask;
          console.log($rootScope.mobileToggleNewTask);
        };
      } else {
        $rootScope.mobileToggleNewTask = true;
        $rootScope.mobileShowHideNewTask = function(){};
      }
    });

}]);