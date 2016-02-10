angular.module('app')
  .controller('UserController', ['$scope', 'UserService', function ($scope, UserService) {
    $scope.login = function(auth) {
      UserService.login(auth);
    };
    $scope.signUp = function(register) {
      UserService.signUp(register);
    };
  }]);