angular.module('app')
  .controller('UserController', ['$scope', 'UserService', '$location', function ($scope, UserService, $location) {
    $scope.login = function(auth) {
      UserService.login(auth)
        .then(function(response) {
          if(response.data.success === true) {
            $scope.firstName = response.data.firstName;
            $scope.loggedIn = "Logged in as " + response.data.username;
            $location.path('/');
          }
          if(response.data.hasOwnProperty('message')){
            $scope.message = response.data.message;
          }
        });
    };
    $scope.signUp = function(register) {
      UserService.signUp(register)
        .then(function(response){
          if(response.data.success === false){
            $scope.message = response.data.message;
          } else {
            $scope.message = response.data.message;
            $scope.firstName = response.data.firstName;
            $scope.loggedIn = "Logged in as " + response.data.username;
            $location.path('/');
          }
        });
    };

    $scope.loggedIn = "Not logged in";

    $scope.logout = function(){
      UserService.logout()
        .then(function(response){
          if(response.data.success === true){
            $location.path('/login');
            $scope.loggedIn = "Not logged in";
          }
        });
    };

    $scope.deleteMessage = function(){
      $scope.message = null;
    };

}]);